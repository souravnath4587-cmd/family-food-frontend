"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  FiBox,
  FiCheck,
  FiDollarSign,
  FiHash,
  FiImage,
  FiLayers,
  FiPercent,
  FiPlus,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";
import { toast } from "react-toastify";

type SpicyLevel = "mild" | "medium" | "spicy";

interface ImageDraft {
  file: File;
  previewUrl: string;
}

const CATEGORY_OPTIONS = [
  "Chanachur",
  "Nimki",
  "Anguli",
  "Bhaja & Chips",
  "Sweets",
  "Gift Boxes",
];

const AGE_OPTIONS = ["All ages", "3+", "5+", "12+"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AddProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEditedManually, setSlugEditedManually] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [spicyLevel, setSpicyLevel] = useState<SpicyLevel>("mild");
  const [ageRecommendation, setAgeRecommendation] = useState("");
  const [ingredientsRaw, setIngredientsRaw] = useState("");
  const [images, setImages] = useState<ImageDraft[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEditedManually) setSlug(slugify(value));
  };

  const handleImagesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const drafts = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...drafts]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !category || !price || !stockQuantity || !weight) {
      setError("Fill in name, category, price, stock, and weight to continue.");
      return;
    }

    const ingredients = ingredientsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      slug: slug || slugify(name),
      description,
      shortDescription,
      images, // TODO: upload each file to your image host first, store the resulting URLs
      category,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stockQuantity: Number(stockQuantity),
      ingredients,
      weight,
      spicyLevel,
      ageRecommendation,
    };

    setIsSaving(true);
    try {
      // TODO: await fetch("/api/admin/products", { method: "POST", body: JSON.stringify(payload) })
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      res.json();

      if (res) {
        toast.success("add successfull.");
      } else {
        toast.error("something getting wrong..");
      }
      console.log("Product payload", payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch {
      setError("Something went wrong saving this product. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className=" min-h-[calc(100vh-4rem)] bg-[#0A0A0D] ">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#131316] p-6 sm:p-8"
      >
        {/* header */}
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5A623]/15 text-[#F5A623]">
            <FiPlus size={16} />
          </span>
          <h1 className="text-lg font-semibold tracking-wide text-white sm:text-xl">
            ADD PRODUCT
          </h1>
        </div>
        <p className="mt-1.5 text-sm text-[#8B8894]">
          Fill in the parameters below to catalog this entry inside your product
          collection.
        </p>

        <div className="mt-6 border-t border-white/10" />

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-[#D1552C]/40 bg-[#D1552C]/10 px-4 py-2.5 text-sm text-[#FF9C7A]"
          >
            {error}
          </div>
        )}

        {/* name */}
        <Field label="Product Name" className="mt-6">
          <InputShell icon={FiHash}>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Classic Chanachur"
              className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
            />
          </InputShell>
          <Hint>Provide a clear, identifying catalog name.</Hint>
        </Field>

        {/* slug */}
        <Field label="Slug" className="mt-5">
          <InputShell icon={FiHash}>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugEditedManually(true);
              }}
              placeholder="classic-chanachur"
              className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
            />
          </InputShell>
          <Hint>
            URL-friendly identifier — auto-generated from the name, editable if
            needed.
          </Hint>
        </Field>

        {/* category / weight */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Category">
            <InputShell icon={FiLayers}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none [&>option]:bg-[#1C1C22]"
              >
                <option value="" disabled className="text-[#5E5B6B]">
                  Select a category
                </option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </InputShell>
          </Field>

          <Field label="Weight">
            <InputShell icon={FiBox}>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 250g, 1kg"
                className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
              />
            </InputShell>
          </Field>
        </div>

        {/* price / discount price */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Price (৳)">
            <InputShell icon={FiDollarSign}>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 220"
                className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
              />
            </InputShell>
          </Field>

          <Field label="Discount Price (৳)">
            <InputShell icon={FiPercent}>
              <input
                type="number"
                min="0"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="Optional"
                className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
              />
            </InputShell>
          </Field>
        </div>

        {/* stock / spicy level */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Stock Quantity">
            <InputShell icon={FiBox}>
              <input
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="e.g. 40"
                className="w-full bg-transparent text-sm text-white placeholder:text-[#5E5B6B] focus:outline-none"
              />
            </InputShell>
          </Field>

          <Field label="Spicy Level">
            <InputShell icon={FiZap}>
              <select
                value={spicyLevel}
                onChange={(e) => setSpicyLevel(e.target.value as SpicyLevel)}
                className="w-full bg-transparent text-sm text-white focus:outline-none [&>option]:bg-[#1C1C22]"
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="spicy">Spicy</option>
              </select>
            </InputShell>
          </Field>
        </div>

        {/* age recommendation */}
        <Field label="Age Recommendation" className="mt-5 sm:w-1/2 sm:pr-2.5">
          <InputShell icon={FiUsers}>
            <select
              value={ageRecommendation}
              onChange={(e) => setAgeRecommendation(e.target.value)}
              className="w-full bg-transparent text-sm text-white focus:outline-none [&>option]:bg-[#1C1C22]"
            >
              <option value="" disabled>
                Select an age range
              </option>
              {AGE_OPTIONS.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </InputShell>
        </Field>

        {/* short description */}
        <Field label="Short Description" className="mt-5">
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One or two lines shown on product cards..."
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-sm text-white placeholder:text-[#5E5B6B] focus:border-[#F5A623]/50 focus:outline-none"
          />
        </Field>

        {/* description */}
        <Field label="Description" className="mt-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full product story — what makes it special, how it's made..."
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-sm text-white placeholder:text-[#5E5B6B] focus:border-[#F5A623]/50 focus:outline-none"
          />
        </Field>

        {/* images */}
        <Field label="Product Images" className="mt-5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-4 text-left hover:border-[#F5A623]/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#F5A623]">
              <FiImage size={17} />
            </span>
            <span>
              <span className="block text-sm font-medium text-white">
                Select product image files...
              </span>
              <span className="mt-0.5 block text-xs text-[#8B8894]">
                JPG, PNG, or WEBP — first image is used as the cover.
              </span>
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesSelected}
            className="hidden"
          />

          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div
                  key={img.previewUrl}
                  className="group relative h-20 w-20 overflow-hidden rounded-lg border border-white/10"
                >
                  <img
                    src={img.previewUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-center text-[9px] font-medium text-[#F5A623]">
                      COVER
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="Remove image"
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <FiX size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        {/* ingredients */}
        <Field label="Ingredients" className="mt-5">
          <textarea
            value={ingredientsRaw}
            onChange={(e) => setIngredientsRaw(e.target.value)}
            placeholder="Enter each ingredient on a brand new line..."
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-sm text-white placeholder:text-[#5E5B6B] focus:border-[#F5A623]/50 focus:outline-none"
          />
          <Hint>
            Separating values line-by-line turns them into a parsable
            ingredients array.
          </Hint>
        </Field>

        <div className="mt-8 border-t border-white/10" />

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-full bg-linear-to-b from-[#F5B84E] to-[#F0900F] px-6 py-2.5 text-sm font-semibold text-[#241503] hover:brightness-105 disabled:opacity-70"
          >
            {isSaving ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <FiCheck size={15} /> Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------- small layout helpers, local to this form ----------

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#F5A623]">
        {label}
      </span>
      {children}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#6E6B7A]">{children}</p>;
}

function InputShell({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1C1C22] px-4 py-2.5 text-[#6E6B7A] focus-within:border-[#F5A623]/50">
      <Icon size={14} />
      {children}
    </div>
  );
}

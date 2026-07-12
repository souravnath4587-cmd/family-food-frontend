import CategoriesSection from "../components/home/Categoriessection";
import CustomerReviews from "../components/home/Customerreviews";
import FAQSection from "../components/home/Faqsection";
import FeaturedProducts from "../components/home/Featuredproducts";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import NewsletterSection from "../components/home/Newslettersection";
import WhyChooseUs from "../components/home/Whychooseus";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ProductsProvider } from "../context/Productscontext";

export default function Home() {
  return (
    <>
      <ProductsProvider>
        <FavoritesProvider>
          <main>
            <HeroSection />
            <CategoriesSection />
            <FeaturedProducts />

            <CustomerReviews />
            <WhyChooseUs />
            <FAQSection />
            <NewsletterSection />
          </main>
          <Footer />
        </FavoritesProvider>
      </ProductsProvider>
    </>
  );
}

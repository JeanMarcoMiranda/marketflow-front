import { useProduct } from "@/hooks/useProduct"
import { useUserPreferencesStore } from "@/store/useUserPreferences"

const ProductListPage = () => {
  const { selected_branch_id, business_id } = useUserPreferencesStore()
  const { products } = useProduct(business_id!, selected_branch_id!)

  console.log(products)

  return (
    <div>ProductListPage</div>
  )
}

export default ProductListPage
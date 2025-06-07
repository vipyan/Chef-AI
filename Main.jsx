// src/Main.jsx
import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import LoadingSvg from "./components/LoadingSvg"  
import { getRecipeFromOpenAI } from "./ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  async function getRecipe() {
    // Show loader and clear any previous recipe
    setIsLoading(true)
    setRecipe("")

    try {
      const recipeMarkdown = await getRecipeFromOpenAI(ingredients)
      setRecipe(recipeMarkdown)
    } catch (err) {
      console.error(err)
      setRecipe("Sorry, something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    if (!newIngredient) return
    setIngredients(prev => [...prev, newIngredient])
  }

  return (
    <main className="main">
      <p className="instructions">Add ingredients to generate recipie(min 4 needed)</p>
      <form action={addIngredient} className="add-ingredient-form">
      
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {/* <section className={`loading-panel ${isLoading ? " visible" : ""}`}>
        <img src="images/loader.svg" alt="loading" />
        <div id="api-message">Creating recipe…</div>
    </section> */}
      
      <LoadingSvg isLoading={isLoading}/>
          
        

      {!isLoading && recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}

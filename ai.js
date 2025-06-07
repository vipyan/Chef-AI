



export async function getRecipeFromOpenAI(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ")
  try {
    const url = 'https://openai-api-worker-chefai.vipinkaniyanthara.workers.dev/'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientsString),
    
    })
    const data = await response.json()
    return data.content

    
    

  } catch (err) {
    console.error("OpenAI error:", err)
    return ""
  }
}

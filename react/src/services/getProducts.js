const getProducts = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/productos')
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)
  }
}

export default getProducts

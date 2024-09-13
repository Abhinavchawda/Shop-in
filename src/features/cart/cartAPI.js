export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart?user=' + userId)
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + itemId,
      {
        method: 'DELETE',
        // body: JSON.stringify(itemId),    //shayad delte request me ye nahi bhejte
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json();
    resolve({ data: { id: itemId } })
  }
  );
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    //get all items of the user and then delete each
    // console.log("Cart in : ")
    const response = await fetchItemsByUserId(userId)
    const items = response.data
    // console.log("cartApi : ", items)
    let i = 0;
    // console.log("len : ", items.length)
    // for (i = 0; i < items.length; i++) {
    //   console.log("Cart API hai : ". items[i].id)
    //   // await deleteItemFromCart(items.id)
    // }
    resolve({ status: "success" })
  }
  );
}
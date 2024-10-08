export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://shop-in-server.vercel.app/cart/',
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
    const response = await fetch('https://shop-in-server.vercel.app/cart?user=' + userId)
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://shop-in-server.vercel.app/cart/' + update.id,
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
    const response = await fetch('https://shop-in-server.vercel.app/cart/' + itemId,
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
    const response = await fetchItemsByUserId(userId)
    const items = response.data
    for (const item of items) {
      await deleteItemFromCart(item?.id)
    }
    resolve({ status: "success" })
  }
  );
}
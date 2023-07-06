const readme = [
  {
    name: "get all product",
    url: "/api/product?size=10&page=1&searchString=",
    method: "get",
  },
  {
    name: "get detail product",
    url: "/api/product/:id",
    method: "get",
  },
  {
    name: "get all icon categories",
    url: "/api/icon-categories",
    method: "get",
  },
  {
    name: "register user",
    url: "/api/user/register",
    method: "post",
    body: "email,gender,password,name,date,month,year",
  },
  {
    name: "login",
    url: "/api/user/login",
    method: "post",
    body: "email,password",
  },
  {
    name: "detail user",
    url: "/api/user/:id",
    method: "get",
  },
  {
    name: "update user",
    url: "/api/user",
    method: "patch",
    body: "id,email,gender,name,date,month,year",
  },
  {
    name: "add to cart",
    url: "/api/cart/add-to-cart",
    method: "post",
    body_example: [
      {
        email_user: "luuthanhlong24@gmail.com",
        product_id: 12373892172,
        image: "imgimg",
        brand: "LENOVO",
        desc_vn: "hahaha",
        price: 200000,
        quantity: 10,
      },
      {
        email_user: "luuthanhlong24@gmail.com",
        product_id: 12373892174,
        image: "imgimg",
        brand: "LENOVO",
        desc_vn: "hahaha",
        price: 200000,
        quantity: 10,
      },
      {
        email_user: "luuthanhlong24@gmail.com",
        product_id: 12373892176,
        image: "imgimg",
        brand: "LENOVO",
        desc_vn: "hahaha",
        price: 200000,
        quantity: 10,
      },
    ],
  },
  {
    name: "get cart",
    url: "/api/cart",
    method: "post",
    body: "email_user",
  },
  {
    name: "update cart",
    url: "/api/cart",
    method: "patch",
    body: "email_user,product_id,quantity",
  },
  {
    name: "drop item cart",
    url: "/api/cart/drop-item",
    method: "de;ete",
    body: "email_user,product_id",
  },
  {
    name: "drop cart",
    url: "/api/cart",
    method: "delete",
    body: "email_user",
  },
  {
    name: "check out",
    url: "/api/order",
    method: "post",
    body: "email_user",
  },
  {
    name: "drop order",
    url: "/api/order",
    method: "patch",
    body: "id, email_user",
  },
  {
    name: "detail order",
    url: "/api/order/:id",
    method: "get",
  },
];

export default readme;

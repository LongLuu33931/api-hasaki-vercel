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
];

export default readme;

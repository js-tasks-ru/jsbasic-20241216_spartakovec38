function makeFriendsList(friends) {
  let names = friends.map(
    (element) => `${element.firstName} ${element.lastName}`
  );

  let list = document.createElement("ul");

  for (let name of names) {
    list.insertAdjacentHTML("beforeEnd", `<li>${name}</li>`);
  }

  return list;
}

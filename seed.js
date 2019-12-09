const db = require('./models');

const freebiesList = [
  {
    author: "5de7e82aba1a412cbcee8a86",
    title: "FREE FOOD COME N GET IT",
    photo: "http://www.catering-by-design.com/wp-content/uploads/2016/08/bigstock-people-group-catering-buffet-f-45983305.jpg",
    address: "1 Test Dr",
    description: "VISA just had a catered lunch and there's hella food left over in the commons area! Come get it before the SEI5 vultures inhale it all!"
  },
  {
    author: "5de8b445be74ba4614e8e0fc",
    title: "Chust Chulian",
    photo: "https://i.imgur.com/cJhvH5C.png",
    address: "2 Test Dr",
    description: "He sux but maybe someone else will enjoy him"
  },
  {
    author: "5de8b507be74ba4614e8e0fd",
    title: "Pre-loved coat",
    photo: "https://www.spurwesternwear.com/images/Product/medium/5266.jpg",
    address: "3 Test Dr",
    description: "I bought this coat for my nephew to grow into but his parents say they don't want to hold onto it for another 20 years until he fits it. That's not my nephew in the pic I'm not sure who it is I found it on the web."
  },
  {
    author: "5de8b3a0be74ba4614e8e0fa",
    title: "RARE sharpened pencil",
    photo: "https://previews.123rf.com/images/tamara1k/tamara1k1611/tamara1k161100123/65569121-very-short-pencil-sharpened-on-both-ends-isolated-on-white.jpg",
    address: "4 Test Dr",
    description: "Super rare pencil used by Dwayne the Rock Johnson when he was in grade school. As you can tell, he was very attached to this particular pencil. Not sure why but it's awesome, I just don't have space for it anymore. Take it away from me!"
  },
  {
    author: "5de8b40abe74ba4614e8e0fb",
    title: "old iPhone 11 Pro, fully functional",
    photo: "https://images-na.ssl-images-amazon.com/images/I/518omJajT2L._SX425_.jpg",
    address: "5 Test Dr",
    description: "I just upgraded to the iPhone 14XL and don't need this one anymore. If no one wants it I'm trashing it."
  },
  {
    author: "5de8b52cbe74ba4614e8e0fe",
    title: "Look at all those chickens",
    photo: "http://static3.mypetchicken.com/images/product_images/Large/Studio_WSilkie_649_bc.jpg",
    address: "6 Test Dr",
    description: "Found some eggs, ended up with a ton of these fluffy chicken things. Kinda cute. Dibs, anyone?"
  },
]

db.Post.deleteMany({}, () => {
  db.Post.create(freebiesList, (error, newFreebie) => {
    if (error) return console.log(error);
    console.log(newFreebie);
  });
});
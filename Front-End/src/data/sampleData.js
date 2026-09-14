import eiffelTower from '../images/eifel_tower.jpg'
import soveuLogo from '../images/sove_u_logo.png'
import logo from '../images/logo.png'

//Sample Data for Media inside vault

const sampleItems = [
{
  id:1,
  title: "research data one",
  type: "pdf",
  tags: ["research", "urban farming", "agriculture"],
  dateAdded: "7.7.26",
  thumbnail: null
},
{
  id:2,
  title: "Eiffel Tower visit",
  type: "image",
  tags: ["Europe", "travel", "Paris", "study-abroad"],
  dateAdded: "7.7.26",
  thumbnail: eiffelTower
}, 
{
  id:3,
  title: "Experiential learning dissertation",
  type: "pdf",
  tags: ["doctorate", "study", "education", "experiential learning"],
  dateAdded: "7.7.26",
  thumbnail: null 
},
{
  id:4,
  title: "Sovereign University logo",
  type: "image",
  tags: ["marketing", "business", "logo"],
  dateAdded: "7.7.26",
  thumbnail: soveuLogo 
},
{
  id:5,
  title: "Software dev study plan",
  type: "pdf",
  tags: ["tech", "professional", "study tool", "experiential learning"],
  dateAdded: "7.7.26",
  thumbnail: null   
},
{
  id:6,
  title: "AMV logo",
  type: "image",
  tags: ["ai generatiom", "marketing", "web design", "tech"],
  dateAdded: "7.7.26",
  thumbnail: logo
}
];

export default sampleItems;
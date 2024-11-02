// eslint-disable-next-line no-unused-vars
import React from 'react'
import {data} from '../restApi.json'
const Menu = () => {
  return (
    <>
      <section className='menu' id='menu'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">POPULAR DISHES</h1>
               
<p>
Fuel Feast is celebrated for its flavorful, nutrient-packed meals, designed with fitness and wellness in mind. Known for offering a range of protein-rich options, hearty snacks, and balanced main dishes, we’re a top choice for health-conscious diners and fitness fans alike. Our restaurant is appreciated for its bold flavors, premium ingredients, and high nutritional standards. If you'd like to know more about our menu, location, or have any other questions about Fuel Feast, we're here to help!
           </p> </div>
            <div className="dishes_container">
                {
                    data[0].dishes.map(element => (
                        <div className="card" key={element.id}>
                                <img src={element.image} alt={element.title} />
                                <h3>{element.title}</h3>
                                <button>{element.category}</button>
                        </div>
                    ))
                }   
            </div>
        </div>
      </section>
    </>
  )
}

export default Menu
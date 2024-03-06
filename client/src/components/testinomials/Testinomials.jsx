import './testinomials.scss';
const items =[
        {
        id:1,
        title:"User1",
        img:"/images/rocket.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ratione dignissimos obcaecati ex necessitatibus ipsum eius unde animi nam ullam."},
        {
        id:2,
        title:"User2",
        img:"/images/rocket.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ratione dignissimos obcaecati ex necessitatibus ipsum eius unde animi nam ullam."},
        {
        id:3,
        title:"User3",
        img:"/images/rocket.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ratione dignissimos obcaecati ex necessitatibus ipsum eius unde animi nam ullam."},
];

const Single =({item})=>{
        return (
                <section>
                        {item.title}
                </section>
        )
}

const Testinomials = () => {
  return (
    <div className='testinomials'>
        <div className="testinomial__title">
                <h1>Our <b>Testinomials</b></h1>
        </div>
        {items.map(item=>
                (<Single item={item} key={item.id}/>)
                   )}
    </div>
  )
}

export default Testinomials

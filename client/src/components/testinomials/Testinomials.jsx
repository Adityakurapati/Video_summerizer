import { useRef } from 'react';
import {motion,useScroll, useSpring, useTransform} from 'framer-motion';
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
        const ref = useRef();
        const {scrollYProgress} = useScroll({target:ref,
        // offset:["start start","end start"]
        });
        // const y = useTransform(scrollYProgress,[0,1],["0%","-300%"]);
        const y = useTransform(scrollYProgress,[0,1],[-300,300]);
        return (
                <section >
                        <div className="container">
                                <div className="wrapper">
                                        <div className="imageContainer" ref={ref}>
                                                <motion.img src={item.img} alt="" />
                                        </div>
                                <motion.div className="textContainer" style={{ y:y}}>
                                <motion.h2 >{item.title}</motion.h2>
                                <motion.p className="discription">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, earum. Modi excepturi neque consequuntur provident exercitationem, nihil mollitia in enim voluptatibus, dicta eos nesciunt, necessitatibus odit? Numquam odio facere nihil officia vel nostrum repellat tenetur ab, ex ea placeat velit dolor ratione aliquam porro quibusdam ullam suscipit alias totam eaque modi deserunt vitae perferendis. Aut facere, similique quisquam at velit deserunt esse, ratione et, voluptatem sapiente ipsum nemo. Possimus sequi repellendus a corporis officiis quis quos, dolores magni explicabo quisquam!
                                </motion.p>
                                <motion.div className="ratings"></motion.div>
                        </motion.div>
                                </div>
                        </div>
                </section>
        )
}

const Testinomials = () => {
        const ref = useRef();
        const {scrollYProgress} = useScroll({target:ref,offset:["end end","start start"]});
        // useSpring
        const scaleX = useSpring(scrollYProgress,{
                stiffness:100,
                damping:30        })
        // const useTransform(scrollYProgress,margin:"-120px");
  return (
    <div className='testinomials' ref={ref}>
        <div className="progress">
                <h1>Our Testinomials</h1>
                <motion.div style={{ scaleX }} className="progressBar"></motion.div>
        </div>
        {items.map(item=>
                (<Single item={item} key={item.id}/>)
                   )}
    </div>
  )
}

export default Testinomials

import { useRef } from 'react';
import {motion,useScroll, useSpring, useTransform} from 'framer-motion';
import './testinomials.scss';
const items = [
        {
            id: 1,
            name: "John Doe",
            image: "/images/user1.jpg",
            description: "John was extremely satisfied with our service. He mentioned how our product significantly improved his productivity and saved him valuable time."
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "/images/user2.jpg",
            description: "Jane loved our platform! She highlighted how user-friendly it was and how it helped her collaborate seamlessly with her team."
        },
        {
            id: 3,
            name: "Michael Johnson",
            image: "/images/user3.jpg",
            description: "Michael shared his positive experience with our customer support team. He praised their responsiveness and willingness to help."
        }
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
                                                <motion.img src={item.image} alt="" />
                                        </div>
                                <motion.div className="textContainer" style={{ y:y}}>
                                <motion.h2 >{item.title}</motion.h2>
                                <motion.p className="discription">
                                        {item.description}
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

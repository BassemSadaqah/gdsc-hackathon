import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React,{useEffect,useState,useContext} from 'react';
import ClassCard from '../components/ClassCard';
import AddClassCard from '../components/AddClassCard'
import Navbar from '../components/Navbar';
import './styles/Home.css'
import { db } from '../firebase';
import { collection, getDocs, addDoc,where } from "firebase/firestore";
import { async } from '@firebase/util';
import { userContext } from '../userContext';
import { render } from '@testing-library/react';
// const { Header, Content, Footer } = Layout;
const Home = () => {
  const user=useContext(userContext)
  const [classes,setClasses]=useState(false)
  const [render,Rerender]=useState(false)
  useEffect(()=>{
    async function getClasses(){
    const querySnapshot = await getDocs(collection(db, "classes"),where('uid','==',user.uid));
    let classesArray=[]
    querySnapshot.forEach((doc) => {
      classesArray.push(doc.data())
    });
    setClasses(classesArray)
    return querySnapshot
    }
    getClasses()
    },[render])
    console.log(classes)
  return (
    <>
    <Navbar />
    <div className='classes-container'>
      <AddClassCard Rerender={Rerender}/>
      {classes?(classes.map((doc)=>
        <ClassCard className={doc.className} subject={doc.subject} room={doc.room}/>
      )):<></>}

    </div>
    </>
  );
};
export default Home;
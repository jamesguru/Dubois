import "./newProduct.css";

import {useState} from 'react'

import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';

import {useDispatch} from 'react-redux';
import app from '../../firebasestore';
import { addProduct } from "../../redux/apiCalls";
import axios from 'axios';

export default function NewProduct() {



  const [inputs, setInputs] = useState({});

  const [file, setFile] = useState(null);

  const [file2, setFile2] = useState(null);

  const [video, setVideo] = useState('');
  const [image, setImage] = useState('');
  const [cat, setCat] = useState([]);

  const [skintype, setSkinType] = useState([]);

  const [concern, setConcern] = useState([]);

  const [percentage, setpercentage] = useState(0);

  const dispatch = useDispatch();

  const [uploading, setUploading] = useState("uploading is 0%");


  
const handleChange = (e) => {

  setInputs(prev => {


    return {...prev, [e.target.name] : e.target.value}
  })
}



const handleCat = (e) => {

  setCat(e.target.value.split(","));
}

const handleConcern = (e) => {

  setConcern(e.target.value.split(","));
}

const handleSkinType = (e) => {

  setSkinType(e.target.value.split(","));
}


const handleUpload = async(e) => {


  e.preventDefault();

  const data = new FormData();

  data.append("file",file);
  data.append("upload_preset", "uploads");


  setUploading("uploading");

  try {


    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dap91fhxh/image/upload",data);

    const {url} = uploadRes.data;

    setImage(url);

    setUploading("uploaded 100%");
    
  } catch (error) {


    console.log(error);


    setUploading("uploading failed");
    
  }



}



const handleUploadVideo =(e) => {

  e.preventDefault();

  const filename = new Date().getTime() + file2.name;

  const storage = getStorage(app);

  const StorageRef = ref(storage, filename);

  const uploadTask = uploadBytesResumable(StorageRef,file2);

  


  uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    setpercentage(progress);
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;

      default:

        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      


      setVideo(downloadURL);
    });
  }
);

}

const handleClick = (e) => {


  const product = {...inputs, video: video, img:image,categories: cat, skintype:skintype, concern: concern};

  e.preventDefault();

  addProduct(product,dispatch);


  window.location.reload();
  
}



  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>

          <button onClick={handleUpload}>upload</button>

          <h4 style={{color:'green'}}>{uploading}</h4>
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id="file" onChange={(e) => setFile2(e.target.files[0])}/>
          <button onClick={handleUploadVideo}>upload</button>
          <h4 style={{color:'teal'}}>{`File upload is ${percentage} %`}</h4>
        </div>
        <div className="addProductItem">
          <label>Title </label>
          <input type="text" name ="title" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Description </label>
          <textarea  name ="desc" cols="40" rows="5" onChange={handleChange} placeholder="description"></textarea>
        </div>

        <div className="addProductItem">
          <label>originalPrice </label>
          <input name ="originalPrice" type="number" placeholder="original price" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>discountedPrice </label>
          <input name ="discountedPrice" type="number" placeholder="discounted price" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>wholesaleSeller </label>
          <input name ="wholesaleSeller" type="text" placeholder="wholesale Seller name" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>wholesalePrice </label>
          <input name ="wholesalePrice" type="number" placeholder="wholesale price" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>wholesaleMinimumQuantity </label>
          <input name ="wholesaleMinimumQuantity" type="number" placeholder="wholesale minimum quantity" onChange={handleChange}/>
        </div>


        <div className="addProductItem">
          <label>Brand </label>
          <input type="text" name ="brand" placeholder="Kylie" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Category </label>
          <input name ="category" type="text" placeholder="jeans,pajamas" onChange={handleCat}/>
        </div>

        <div className="addProductItem">
          <label>Concern</label>
          <input name ="concern" type="text" placeholder="Dandruff,whitening,small circles" onChange={handleConcern}/>
        </div>

        <div className="addProductItem">
          <label>Skin type </label>
          <input name ="skintype" type="text" placeholder="normal,dry,all" onChange={handleSkinType}/>
        </div>


        <div className="addProductItem">
          <label>Instock</label>
          <select name="inStock" onChange={handleChange}>


            <option value="true">Yes</option>
            <option value = "false">No</option>
          </select>

          
        </div>
        
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}

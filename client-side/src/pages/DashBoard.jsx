import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  margin: 0% 10%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 30px;
`;

const Input = styled.input`
  margin: 20px 0px;
  padding: 10px;
  font-weight: bold;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  font-weight: 900;
  font-size: 25px;
  background-color: #0c0c0c;
  color: #dcca87;
  cursor: pointer;
  margin: 20px 0px;
`;
const Heading = styled.h3`
  font-weight: 900;
  font-size: 25px;
  margin: 20px;
`;
const Label = styled.label`
  font-weight: 900;
  font-size: 20px;
`;
const TextArea = styled.textarea`
  padding: 100px;
`;

const Select = styled.select`
  padding: 10px;
  font-weight: bold;
`;

const Cat = styled.div``;

const CatWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 900;

  width: 1000px;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 200px;
  display: flex;
  margin: 5px;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.span`
  font-family: "Roboto";
  font-weight: 900;
  font-size: 22px;
`;

const UploadImg = styled.button`
  width: 100%;
  border: none;

  font-weight: 900;
  font-size: 18px;
  background-color: #0c0c0c;
  color: #dcca87;
  cursor: pointer;
  margin: 20px 0px;
`;

let Concern = [];
let Category = [];
let SkinType = [];

const DashBoard = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState("uploading is 0%");
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategory = (cat) => {
    Category.push(cat);
  };

  const handleSkinType = (skintype) => {
    SkinType.push(skintype);
  };

  const handleConcern = (concern) => {
    Concern.push(concern);
  };

  const handleClick = (e) => {
    e.preventDefault();

    Category.push(user.seller);
    Category.push('all');
    const product = {
      ...inputs,
      img: image,
      email: user.email,
      wholesaleSeller:user.seller,
      phone: user.phone,
      categories: Category,
      skintype: SkinType,
      concern: Concern,
    };

    try {
      publicRequest.post("/products/", product);

      window.location.reload();
    } catch (error) {}
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "uploads");

    setUploading("uploading");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dap91fhxh/image/upload",
        data
      );

      const { url } = uploadRes.data;

      setImage(url);

      setUploading("uploaded 100%");
    } catch (error) {
      console.log(error);

      setUploading("uploading failed");
    }
  };

  return (
    <Container>
      <Heading>Create Product</Heading>
      <Wrapper>
        <Label>Image</Label>
        <Input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <UploadImg onClick={handleUpload}>upload</UploadImg>

        <h4 style={{ color: "green", fontWeight: "bold" }}>{uploading}</h4>
        <Label>Video</Label>
        <Input type="file" />
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Dr Rashel"
        />
        <Label>Description</Label>
        <TextArea
          name="desc"
          cols="40"
          rows="5"
          onChange={handleChange}
          placeholder="description"
        />
        <Label>Original Price</Label>
        <Input
          name="originalPrice"
          type="number"
          placeholder="original price"
          onChange={handleChange}
        />
        <Label>Discount Price</Label>
        <Input
          name="discountedPrice"
          type="number"
          placeholder="discounted price"
          onChange={handleChange}
        />
        
        <Label>Wholesale Price</Label>
        <Input
          name="wholesalePrice"
          type="number"
          placeholder="wholesale price"
          onChange={handleChange}
        />
        <Label>Wholesale Minimum Quantity</Label>
        <Input
          name="wholesaleMinimumQuantity"
          type="number"
          placeholder="wholesale minimum quantity"
          onChange={handleChange}
        />
        <Label>Brand</Label>
        <Input
          type="text"
          name="brand"
          placeholder="Kylie"
          onChange={handleChange}
        />

        <Cat>
          <Header>Category</Header>
          <CatWrapper>
            <Item>
              <label>Popular</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("popular")}
              />
            </Item>

            <Item>
              <label>All</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("all")}
              />
            </Item>
            <Item>
              <label>Wholesale</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("wholesale")}
              />
            </Item>
            <Item>
              <label>Discount</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("discount")}
              />
            </Item>
            <Item>
              <label>Nail Products</label>
              <Input
                name="category"
                type="checkbox"
                onClick={() => handleCategory("nailproducts")}
              />
            </Item>
            <Item>
              <label>Facial Products</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("faceproducts")}
              />
            </Item>
            <Item>
              <label>Gifts</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("gifts")}
              />
            </Item>
            <Item>
              <label>Body Products</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("bodyproducts")}
              />
            </Item>
            <Item>
              <label>Hair Products</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("hairproducts")}
              />
            </Item>
            <Item>
              <label>Nails Products</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("nailsproducts")}
              />
            </Item>
            <Item>
              <label>Jewerelly products</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("jewerelly")}
              />
            </Item>
            <Item>
              <label>Serums</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("serums")}
              />
            </Item>
            <Item>
              <label>Moisturizers</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("moisturizers")}
              />
            </Item>
            <Item>
              <label>Toners</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("toners")}
              />
            </Item>
          </CatWrapper>
        </Cat>

        <Cat>
          <Header>Concern</Header>
          <CatWrapper>
            <Item>
              <label>Dry Skin</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Dry Skin")}
              />
            </Item>

            <Item>
              <label>Pigmentation</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Pigmentation")}
              />
            </Item>
            <Item>
              <label>Oil Control</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Oil Control")}
              />
            </Item>
            <Item>
              <label>Anti Acne</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Anti Acne")}
              />
            </Item>
            <Item>
              <label>Sunburn</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Sunburn")}
              />
            </Item>
            <Item>
              <label>Skin Brightening</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Skin Brightening")}
              />
            </Item>
            <Item>
              <label>Tan Removal</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Tan Removal")}
              />
            </Item>
            <Item>
              <label>Night Routine</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Night Routine")}
              />
            </Item>
            <Item>
              <label>UV Protection</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("UV Protection")}
              />
            </Item>
            <Item>
              <label>Damaged Hair</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Damaged Hair")}
              />
            </Item>
            <Item>
              <label>Frizzy Hair</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Frizzy Hair")}
              />
            </Item>

            <Item>
              <label>Stretch Marks</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Stretch Marks")}
              />
            </Item>
            <Item>
              <label>Color Protection</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Color Protection")}
              />
            </Item>
            <Item>
              <label>Dry Hair</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Dry Hair")}
              />
            </Item>
            <Item>
              <label>Soothing</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Soothing")}
              />
            </Item>
            <Item>
              <label>Dandruff</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Dandruff")}
              />
            </Item>
            <Item>
              <label>Greying</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Greying")}
              />
            </Item>
            <Item>
              <label>Hair Fall</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Hair Fall")}
              />
            </Item>
            <Item>
              <label>Hair Color</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleConcern("Hair Control")}
              />
            </Item>
          </CatWrapper>
        </Cat>

        <Cat>
          <Header>Skin Type</Header>
          <CatWrapper>
            <Item>
              <label>All</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleSkinType("All")}
              />
            </Item>

            <Item>
              <label>Oily</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("Oily")}
              />
            </Item>
            <Item>
              <label>Sensitive</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("Sensitive")}
              />
            </Item>
            <Item>
              <label>Normal</label>
              <Input
                name="category"
                placeholder="jeans,pajamas"
                type="checkbox"
                onClick={() => handleCategory("Normal")}
              />
            </Item>
          </CatWrapper>
        </Cat>
        <Label>Instock</Label>
        <Select name="inStock" onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Button onClick={handleClick}>Create Product</Button>
      </Wrapper>
    </Container>
  );
};

export default DashBoard;

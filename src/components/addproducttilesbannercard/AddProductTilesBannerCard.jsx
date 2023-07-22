import React, { useEffect, useState } from 'react'
// import "./ProductTilesCard.css"
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import images from '../../constants/images';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMallContext } from '../../context/mall_context';
import { useStoreContext } from '../../context/store_context';
import Select from "react-select";
import makeAnimated from "react-select/animated";


const animatedComponents = makeAnimated();

const AddProductTilesBannerCard = ({ item, mindx, openMallModal,
    setTab,
    gatweek,
    setweek,
    peopleInfo,
    mallidarray,
    regionidarray,
    selectedMalls, }) => {

    const { DeleteProductTileApi, category_data, CreateProductTileApi, multiple_week_data } = useStoreContext();
    const { get_brand_data, get_mall_data } = useMallContext();

    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [BrandName, setBrandName] = useState("");
    const [Category, setCategory] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDiscription] = useState("");
    const [Week, setWeek] = useState("");
    const [Region, setRegion] = useState([]);
    const [mallsOption, setMallsOption] = useState([]);

    // const [deletemodalstate, setDleteModalstate] = useState(false);
    const [getcondition, setCondition] = useState(true);


    useEffect(() => {
        // setTitle(item.title ? item.title : "");
        // setMallName(item.malls.name ? item.malls.name : '');
        // setBrandName(item.brands.name ? item.brands.name : "");
        // setCategory(item.categorys.name ? item.categorys.name : item.categorys.name);
        // setDiscription(item.description ? item.description : item.description);
        // setPrice(item.price ? item.price : item.price);
        // setWeek(item.title ? item.title : "");

    }, [])





    // logo dropzon

    const { getRootProps: getRootlogoProps, getInputProps: getInputlogoProps } =
        useDropzone({
            onDrop: (acceptedFiles) => {
                console.log("file type", files[0]);
                console.log("acceptedFiles", acceptedFiles[0].File);

                {
                    setFiles(
                        acceptedFiles.map((file) =>
                            Object.assign(file, {
                                preview: URL.createObjectURL(file),
                            })
                        )
                    );
                }
                setCondition(true);
                if (acceptedFiles.length === 0) {
                    window.location.reload(true);
                }
            },
        });

    const thumbs = files.map((file) => (
        <img
            src={file.preview}
            style={{ width: "100%", height: "100%", }}
            className="img-fluid"
            alt="file"
        />
    ));

    // Update Promotion Banner Api

    const AddProductTilesBanner = async () => {

        console.log("test");

        const formdata = await new FormData();
        // await formdata.append("id", item.id)
        await formdata.append("title", title)
        for (var i = 0; i < regionidarray.length; i++) {
            await formdata.append("region_id[" + i + "]", regionidarray[i].id);
        }
        for (var i = 0; i < mallidarray.length; i++) {
            await formdata.append("mall_id[" + i + "]", mallidarray[i].id);
        } await formdata.append("brand_id", BrandName)
        await formdata.append("category_id", Category)
        await formdata.append("price", Price)
        await formdata.append("description", Description)
        await formdata.append("week_id", "")
        await formdata.append("region_child_id[0]", "")
        if (files[0] !== undefined) {
            await formdata.append("image", files[0]);
        }



        console.log("-=-=-=->", formdata);
        const data = await CreateProductTileApi(formdata);
        if (data) {
            if (data.success === 1) {
                console.log("category-data", data);
                setTab(1);
                // getLeaderboard();
                // window.location.reload();
            }
        }
    }

    const DeleteProductTilesboard = async () => {

        console.log("test");

        const formdata = await new FormData();
        await formdata.append("id", item.id)


        console.log("-=-=-=->", formdata);
        const data = await DeleteProductTileApi(formdata);
        if (data) {
            if (data.success === 1) {
                console.log("mall-data", data);
                setTab(1);
                // getLeaderboard();
            }
        }
    }

    // const testfunction = () => {
    //   console.log("test");
    // }

    useEffect(() => {
        console.log("cdategory data", category_data);
    })
    return (
        <div className="leaderboard-card-main-wrapp product-tiles-card-main-wrapp">
            {/* Leaderboard flex start */}
            <div className="leaderboard-card-flex-wrapp">

                {/* Leaderboard first part responsive side start */}
                <div className="leaderboard-card-first-resp-main-wrapp">
                    <p className='leaderboard-last-part-txt'>Service fee will
                        apply if canceled</p>
                    <button className='leaderboard-delete-icon-btn' onClick={() => DeleteProductTilesboard()}>cancel <img src={images.delete_icon} className='leaderboard-delete-icon' /></button>
                </div>
                {/* Leaderboard first part responsive side end*/}

                {/* Leaderboard part first start */}
                <div className="leaderboard-card-part-first" style={{ width: '42% !important' }}>

                    {/* Leaderboad form start */}


                    {/* Leaderboard inputbox start */}
                    <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Title:</label>
                        <input type="text" className="leaderboard-card-inp" placeholder='Summer Campaign 2024' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Mall(s):</label>
                        <div
                            onClick={() => openMallModal()}
                            className="leaderboard-card-inp"
                            style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                        >
                            {selectedMalls && selectedMalls.length > 0
                                ? selectedMalls.map((mall, mindx) => {
                                    return <p className="">{mall}</p>;
                                })
                                : null}
                            {/* <p className="">abc</p>
              <p className="">abc</p>
              <p className="">abc</p> */}
                        </div>
                        {/* <Select
                            value={mallsOption}
                            styles={{ width: "100%", padding: "0px" }}
                            className="leaderboard-card-inp"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={[colourOptions[4], colourOptions[5]]}

                            isMulti
                            options={multiple_week_data}
                            onChange={setMallsOption}
                        /> */}
                        {/* <button
              className="leaderboard-card-inp"
              style={{ color: "rgb(129 128 128)", textAlign: "start" }}
              onClick={() => openMallModal()}
            >
              Select Mall
            </button> */}
                    </div>
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Brand(s):</label>
                        <select
                            className="leaderboard-card-inp"
                            onChange={(e) => {
                                console.log("rrr", e.target.value);
                                setBrandName(e.target.value);
                            }}
                        >
                            <option selected disabled value="">
                                Select Brand
                            </option>
                            {get_brand_data &&
                                get_brand_data.map((item, index) => {
                                    return (
                                        <>
                                            <option value={item.id} key={index}>
                                                {item.name}
                                            </option>
                                        </>
                                    );
                                })}
                        </select>
                    </div>
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    {/* <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">From:</label>
                        <DatePicker
                            // selected={birthDate}
                            // onChange={(date) => setBirthDate(date)}
                            className="red-border leaderboard-card-inp"
                            placeholderText="Date Of Birth"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div> */}
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    {/* <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Until:</label>
                        <DatePicker
                            // selected={birthDate}
                            // onChange={(date) => setBirthDate(date)}
                            className="red-border leaderboard-card-inp"
                            placeholderText="Date Of Birth"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div> */}
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Price:</label>
                        <input type="text" className="leaderboard-card-inp" placeholder='Rxxx' value={Price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    {/* Leaderboard inputbox end */}

                    {/* Leaderboard inputbox start */}
                    <div className="leaderboard-card-inpbox-wrapp">
                        <label className="leaderboard-card-lbl">Description:</label>
                        <textarea style={{ height: "60px" }} className="leaderboard-card-inp" placeholder='XS, S, M, L, XL, XXL' value={Description} onChange={(e) => setDiscription(e.target.value)} />
                    </div>
                    {/* <button onClick={() => openMallModal()} className="leaderboard-delete-icon-btn">
                        <span className="leaderboard-extend-txt">Chose Date</span>{" "}
                        <img src={images.banner_cal_img} className="leaderboard-delete-icon" style={{ width: "42px", height: "42px" }} />
                    </button> */}

                    {/* Leaderboard inputbox end */}

                    {/* Leaderboad form end */}
                </div>

                {/* Leaderboard part first end */}

                {/* Leaderboard part second start */}

                <div className="leaderboard-card-part-sec product-tiles-card-sec-part" style={{ width: "30%" }} {...getRootlogoProps()}>
                    <input
                        {...getInputlogoProps()}
                        accept="image/jpeg, image/jpg, image/png, image/eps"
                    />
                    {getcondition === true ? <>
                        {files && files.length > 0 ? (
                            <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl">
                                {thumbs}
                            </div>
                        ) : (
                            <div style={{ width: "100%" }} >
                                <div className="leaderboard-card-part-sec2">
                                    <AiOutlineCloudUpload
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            color: "var(--color-orange)",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <h4>.PDF .JPG .PNG</h4>
                                    <p>You can also upload file by</p>

                                    <button type="button" className="click_upload_btn">
                                        clicking here
                                    </button>
                                </div>
                            </div>
                        )}
                    </> : <>
                        {item.image_path === null ? (
                            <div style={{ width: "100%" }}>
                                <div className="leaderboard-card-part-sec2">
                                    <AiOutlineCloudUpload
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            color: "var(--color-orange)",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <h4>.PDF .JPG .PNG</h4>
                                    <p>You can also upload file by</p>

                                    <button type="button" className="click_upload_btn">
                                        clicking here
                                    </button>
                                    {/* <a href="">clicking here</a> */}
                                </div>
                            </div>
                        ) : (
                            <div className="myprofile_inner_sec2_img_upload leaderboard-card-part-img-upl">
                                <img
                                    src={item.image_path}
                                    style={{ width: "100%", height: "100%" }}
                                    className="img-fluid"
                                />
                            </div>
                        )}
                    </>}



                </div>
                {/* Leaderboard part second end */}

                {/* Leaderboard part third start */}
                <div className="leaderboard-card-part-third" style={{ width: "24%", alignSelf: "end" }}>
                    {/* <button className='leaderboard-delete-icon-btn' onClick={() => DeleteProductTilesboard()}>cancel <img src={images.delete_icon} className='leaderboard-delete-icon' /></button>
                    <p className='leaderboard-last-part-txt'>Service fee will
                        apply if canceled</p>
                    <Link className='leaderboard-delete-icon-btn'><span className='leaderboard-extend-txt'>Extend</span> <img src={images.extend_icon} className='leaderboard-delete-icon' /></Link> */}
                    <div className='leaderboard-btn-box'>
                        <button className='btn btn-orange' onClick={() => AddProductTilesBanner()}>Publish</button>
                    </div>
                </div>
                {/* Leaderboard part third end */}

                {/* Leaderboard last part responsive side start */}
                <div className='leaderboard-card-sec-resp-main-wrapp'>
                    {/* <Link className='leaderboard-delete-icon-btn'><span className='leaderboard-extend-txt'>Extend</span> <img src={images.extend_icon} className='leaderboard-delete-icon' /></Link> */}
                    <div className='leaderboard-btn-box'>
                        <button className='btn btn-orange' onClick={() => AddProductTilesBanner()}>Publish</button>
                    </div>
                </div>
                {/* Leaderboard last part responsive side end */}

            </div>
            {/* Leaderboard flex start */}

        </div >
    )
}

export default AddProductTilesBannerCard
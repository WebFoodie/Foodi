import React, { useEffect, useState } from 'react'
import Categories from '../home/Categories';
import Cards from '../../components/Cards';
import {FaFilter} from "react-icons/fa"

const Menu = () => {
    const [menu, setMenu] = useState([]); // Why [] because in menu.json the all elements in array
    const [filteredItem, setFilteredItem] = useState([]);
    const [selecedCategory, setSelecedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage]=useState(9);

    // Data Loading
    useEffect(() => {
        // Fetch Data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch("/menu.json");
                const data = await response.json();
                // console.log(data);
                setMenu(data);
                setFilteredItem(data);
            }
            catch (error) {
                console.log("Error fetching data", error);
            }
        };
        // Call the function
        fetchData();
    }, [])


    // Filtering data base in category
    const filterItem = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);

        setFilteredItem(filtered);
        setSelecedCategory(category);
        setCurrentPage(1);
    }

    // Show all data
    const showAll = () => {
        setFilteredItem(menu);
        setSelecedCategory("all");
        setCurrentPage(1);
    }

    // Sorting based on A-Z , Z-A, Low-High Priceing
    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItems = [...filteredItem];

        // logic
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - (b.price))
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - (a.price))
                break;
        }

        setFilteredItem(sortedItems);
        setCurrentPage(1);

    }

    //  Pagination Logic : 1 2 3 4 etc pages
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItem.slice(indexOfFirstItem,indexOfLastItem);
    const paginate = (pageNumber) =>setCurrentPage(pageNumber);

    return (
        <div>
            {/* Menu Banner */}
            <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] ">
                <div className="py-48 flex flex-col justify-center items-center gap-8">
                    <div className="text-center  space-y-7 px-4">
                        <h2 className="md:text-6xl text-4xl font-bold md:leading-snug leading-snug">
                            For the Love of Delicious {" "}
                            <span className="text-green">Food</span>
                        </h2>
                        <p className="text-2xl text-[#4A4A4A] mx-auto md:">
                            Come with family and feel the joy of mouthwatering food such as Greek Salad, Lasagne,Butternut
                            Pumpking, Tokusen Wagyu, Olivase Rellenas and more for a moderate cost
                        </p>
                        <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu shop section */}
            <div className='section-container my-5'>

                {/* Filtering and sorting */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>

                    {/* all category Btns */}
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        {/* Here the classname active refers to just make the color green and uderline (in App.css) */}
                        <button onClick={showAll}
                            className={selecedCategory === 'all' ? "active" : ""}>All</button>
                        <button onClick={() => filterItem("salad")} className={selecedCategory === 'salad' ? "active" : ""}>Salad</button>
                        <button onClick={() => filterItem("pizza")} className={selecedCategory === 'pizza' ? "active" : ""}>Pizza</button>
                        <button onClick={() => filterItem("soup")} className={selecedCategory === 'soup' ? "active" : ""}>Soups</button>
                        <button onClick={() => filterItem("dessert")} className={selecedCategory === 'dessert' ? "active" : ""}>Desserts</button>
                        <button onClick={() => filterItem("drinks")} className={selecedCategory === 'drinks' ? "active" : ""}>Drinks</button>
                    </div>


                    {/* sorting base filtering */}
                    <div className='flex justify-end mb-4 rounded-sm gap-4'>
                        <div className=' p-2'>
                            <FaFilter className="h-4 w-4 text-black"/>
                        </div>
                        {/* sorting options */}
                        <select name = "sort" id="sort" onChange={(e)=>handleSortChange(e.target.value)} 
                        value={sortOption} 
                        className='text-white px-2 py-1 rounded-lg bg-black'>
                        <option value="default">Default</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="low-to-high">Low To High</option>
                        <option value="high-to-low">High To Low</option>

                        </select>
                    </div>
                  

                    
                    
                </div>

                {/* Product Card */}
                <div className='grid md:grid-col-4 sm:grid-cols-3 grid-col-1 gap-4'>
                    {
                        currentItems.map((item) => (
                            <Cards key={item._id} item={item} />
                        ))
                    }
                </div>
            </div>

            {/* Pagination Section */}
            <div className='flex justify-center my-8'>
                {
                    Array.from({length :Math.ceil(filteredItem.length/itemsPerPage)}).map((_,index)=>(
                        <button key={index+1}
                        onClick={()=>paginate(index+1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index+1 ? "bg-green text-white" : "bg-gray-200 "}`}>
                                {index+1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Menu
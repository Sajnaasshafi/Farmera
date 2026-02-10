import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Signin from './pages/Signin';
import Login from './pages/Login';

import Farmersingin from './pages/farmerpages/Signin'
import Farmerdashboard from './pages/farmerpages/Dashboard'

import Buyersingin from './pages/buyerpages/Signin'
import Home from './pages/buyerpages/Home';
import Shop from './pages/buyerpages/Shop';
import Myorders from './pages/buyerpages/Myorders';

import Admindashboard from './pages/adminpages/Dashboard'

import Harvested from './pages/farmerpages/Harvested';
import Harvesteddetails from './pages/farmerpages/Harvesteddetails'
import AllCrops from './pages/farmerpages/Harvestedtabs/Allcrops'
import MyCrops from './pages/farmerpages/Harvestedtabs/Mycrops'
import AddCrop from './pages/farmerpages/Harvestedtabs/Addcrops'

import FutureHarvest from './pages/farmerpages/FutureHarvest';
import FutureHarvestdetails from './pages/farmerpages/FutureHarvestdetails';
import AllCropsFH from './pages/farmerpages/FutureHarvesttabs/Allcrops'
import MyCropsFH from './pages/farmerpages/FutureHarvesttabs/Mycrops'
import AddCropFH from './pages/farmerpages/FutureHarvesttabs/Addcrops'
import FutureHarvestallcropdet from './pages/farmerpages/FutureHarvestallcropdet';
import Harvestedallcropdet from './pages/farmerpages/Harvestedallcropdet';
import Buyerqueries from './pages/farmerpages/Buyerqueries';




import Dashboard from './pages/adminpages/Dashboard';
import Buyermanagment from './pages/adminpages/Buyermanagment';
import Farmermanagment from './pages/adminpages/Farmermanagment';
import FarmerBuyerqueries from './pages/adminpages/FarmerBuyerqueries';
import Ordermanagement from './pages/adminpages/Ordermanagement';
import Harvestedcrops from './pages/buyerpages/Shoptabs/Harvestedcrops'
import Futureharvest from './pages/buyerpages/Shoptabs/Futureharvest'
import Cart from './pages/buyerpages/Cart';
import Wishlist from './pages/buyerpages/Whishlist';
import Profile from './pages/buyerpages/Profile';
import BuyerSettings from './pages/buyerpages/Settings';
import BuyerProfileEdit from './pages/buyerpages/Settingstabs/ProfileEdit';
import Addresses from './pages/buyerpages/Settingstabs/Address';
import ProductHarvested from './pages/buyerpages/Productdetails/Harvested';
import Productfutureharvest from './pages/buyerpages/Productdetails/Futureharvest'
import Myquery from './pages/buyerpages/Myquery';
import Checkout from './pages/buyerpages/Checkout';
import FarmerSettings from './pages/farmerpages/Settings';
import Order from './pages/farmerpages/Order';


function App() {
  

  return (
    <BrowserRouter>
       <Routes>
        //Landing and Login pages
        <Route path='/' element={<Signin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        //Farmers
        <Route path='/farmersignin' element={<Farmersingin/>}></Route>
        <Route path='farmer/farmerdashboard' element={<Farmerdashboard/>}></Route>
        <Route path='/farmer/farmerbuyerqueries' element={<Buyerqueries/>}></Route>
        <Route path='/farmer/farmersettings' element={<FarmerSettings/>}></Route>
        <Route path='/farmer/orders' element={<Order/>}></Route>
        
        //harvested
        <Route path='/farmer/harvestedcrops' element={<Harvested/>}>
          <Route index element={<AllCrops />} />
          <Route path="all" element={<AllCrops />} />
          <Route path="my" element={<MyCrops />} />
          <Route path="add" element={<AddCrop />} />
        </Route>
        <Route path='farmer/harvestedcrops/harvestedcropsdetails/:id' element={<Harvesteddetails/>}></Route>
        <Route path='farmer/harvestedcrops/harvestedallcropdet/:id' element={<Harvestedallcropdet/>}></Route>

        //Future Harvest
        <Route path='farmer/futureharvestcrops' element={<FutureHarvest/>}>
          <Route index element={<AllCropsFH />} />
          <Route path="all" element={<AllCropsFH />} />
          <Route path="my" element={<MyCropsFH />} />
          <Route path="add" element={<AddCropFH />} />
        </Route>
        <Route path='farmer/futureharvestcrops/futureharvestcropsdetails/:id' element={<FutureHarvestdetails/>}></Route>
        <Route path='farmer/futureharvestcrops/futureharvestallcropdet/:id' element={<FutureHarvestallcropdet/>}></Route>

        //Buyers
        <Route path='/buyersignin' element={<Buyersingin/>}></Route>
        <Route path='/buyer/home' element={<Home/>}></Route>
        <Route path='/buyer/checkout' element={<Checkout/>}></Route>
        <Route path='/buyer/shop' element={<Shop/>}>
          <Route index element={<Harvestedcrops />} />
          <Route path="harvested" element={<Harvestedcrops />} />
          <Route path="futureharvest" element={<Futureharvest />} />
        </Route>
        <Route path='/buyer/myorder' element={<Myorders/>}></Route>
        <Route path='/buyer/myquery' element={<Myquery/>}></Route>
        <Route path='/buyer/cart' element={<Cart/>}></Route>
        <Route path='/buyer/harvestedproductdetails/:id' element={<ProductHarvested/>}></Route>
        <Route path='/buyer/futureharvestproductdetails/:id' element={<Productfutureharvest/>}></Route>
        <Route path='/buyer/wishlist' element={<Wishlist/>}></Route>
        <Route path='/buyer/profile' element={<Profile/>}></Route>
        <Route path="/buyer/settings" element={<BuyerSettings />}>
        <Route index element={<BuyerProfileEdit />} />
        <Route path="account" element={<BuyerProfileEdit />} />
        <Route path="addresses" element={<Addresses />} />
      </Route>
        

        {/* <Route path='/admindashboard' element={<Admindashboard/>}></Route> */}

        //Admin
         <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
         <Route path='/admin/farmermanagement' element={<Farmermanagment/>}></Route>
         <Route path='/admin/buyermanagement' element={<Buyermanagment/>}></Route>
         <Route path='/admin/querymanagement' element={<FarmerBuyerqueries/>}></Route>
         <Route path='/admin/ordermanagement' element={<Ordermanagement/>}></Route>
       </Routes>


       
       </BrowserRouter>
  );
};


export default App

import ImageField from '../../Resuable_Comp/ImageField';
import './MidStrip.css';

function MidStrip(){
    return(
        <div className='strip'>
            <ImageField image={'https://img.freepik.com/premium-vector/free-delivery-banner-with-courier-scooter-delivers-package-free-shipping-order-fast-delivery-badge-advertisement-express-delivery-with-man-scooter-vector-illustration_435184-1202.jpg?w=2000'}/>
            <ImageField image={'https://th.bing.com/th/id/OIP.m-yLEvENqT_6C5A4JUkOswHaB4?w=900&h=229&rs=1&pid=ImgDetMain'}/>
            <ImageField image={'https://www.beanbagbazaar.co.uk/media/wysiwyg/BBBCategory/M2_Sale/SALE-Banners-Desk-HOME-1240x350.jpg'}/>
        </div>
    )
}

export default MidStrip;

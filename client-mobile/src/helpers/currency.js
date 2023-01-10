import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(money);
};

export default formatRupiah;

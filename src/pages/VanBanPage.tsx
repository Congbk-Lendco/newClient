import { useParams } from "react-router-dom";
import VanBanChiTiet from "../pages/vanbanchitiet";

const VanBanPage: React.FC = () => {
  const { id } = useParams();
  return <VanBanChiTiet idVanBan={id || null} onClose={() => {}} />;
};
export default VanBanPage;
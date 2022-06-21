import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import DateIcon from "../../data/img/calendar-icon.png";
import DefaultImage from "../../data/img/default-img.webp";
import { Workbook } from "../../types/Workbook";
import { useWorkbooksRefresh } from "./WorkbookCards";
import "./CardItem.scss";
import EditCard from "./EditCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
type Props = {
  data: Workbook;
};
const CardItem = ({ data }: Props) => {
  const navigate = useNavigate();
  const cardsRefresh = useWorkbooksRefresh();
  const createdDate = new Date(data.createdAt).toLocaleDateString();
  const [editVisible, setEditVisible] = useState(false);

  const confirm = async () => {
    try {
      const response = await fetch(
        apiEndpoint("workbook", "delete", data.id.toString()),
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      cardsRefresh();
      message.success("Deleted workbook successfully");
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

  const onCloseEdit = () => {
    setEditVisible(false);
    cardsRefresh();
  };
  const handleDetail = () => {
    navigate(`/workbook/${data.id}`);
  };

  return (
    <Card
      size="small"
      cover={<img alt="default" src={data.url || DefaultImage} />}
      actions={[
        <InfoCircleOutlined key={"detail"} onClick={handleDetail} />,
        <EditOutlined key="edit" onClick={() => setEditVisible(true)} />,
        <Popconfirm
          key="delete"
          title="Are you sure want to delete this?"
          onConfirm={confirm}
          okText={[
            <span className="text-blue-500 transition-all hover:text-white">
              Yes
            </span>,
          ]}
          cancelText="No"
        >
          <i className="fal fa-trash text-red-400"></i>
        </Popconfirm>,
      ]}
    >
      <Meta
        title={
          <div className="flex items-start flex-col gap-2 mb-2">
            <h3 className="text-lg font-medium line-clamp-2">{data.name}</h3>
            <div className="flex items-center justify-between gap-1">
              <img srcSet={DateIcon} className="w-4 h-4 object-cover" />
              <span className="text-sm">{createdDate}</span>
            </div>
          </div>
        }
        description={<p className="line-clamp-3">{data.description}</p>}
      />
      <EditCard workbook={data} visible={editVisible} onClose={onCloseEdit} />
    </Card>
  );
};

export default CardItem;

import {Typography} from "antd";
import dayjs from "dayjs";

const ATSDate = ({date}: { date: string }) => {
  return (
    <Typography.Text>
      {dayjs(date).format('DD MMM YYYY')}
    </Typography.Text>
  );
}

export default ATSDate;
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { dateFormate } from '../modules/constant';

const ATSDate = ({ date }: { date: string }) => {
  return <Typography.Text>{dayjs(date).format(dateFormate)}</Typography.Text>;
};

export default ATSDate;

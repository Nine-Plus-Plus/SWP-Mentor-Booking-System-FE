import { DatePicker } from 'antd'
import React from 'react'

const Search = () => {
//           <div>
// const onOk = (value) => {
//   console.log('onOk: ', value);
// };
// const App = () => (
//   <Space direction="vertical" size={12}>
//     <DatePicker
//       showTime
//       onChange={(value, dateString) => {
//         console.log('Selected Time: ', value);
//         console.log('Formatted Selected Time: ', dateString);
//       }}
//       onOk={onOk}
//     />
//     <RangePicker
//       showTime={{
//         format: 'HH:mm',
//       }}
//       format="YYYY-MM-DD HH:mm"
//       onChange={(value, dateString) => {
//         console.log('Selected Time: ', value);
//         console.log('Formatted Selected Time: ', dateString);
//       }}
//       onOk={onOk}
//     />
//   </Space>
//         </div>
    return (
      <div>
        <DatePicker />
      </div>
    )
}

export default Search

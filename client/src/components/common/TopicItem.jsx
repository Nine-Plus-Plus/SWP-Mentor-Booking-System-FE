import { Space, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import React from 'react';

const TopicItem = ({ setPayloadProject, setShowTopic }) => {
  const data = [
    {
      key: '1',
      id: 14,
      topic_name: 'Hair Salon Booking App',
      context: 'Customer demand to search, book, and experience hair salon services easily and conveniently.',
      problems: 'Difficulty in searching and booking at hair salons',
      actors: ['Guest', 'Customer', 'Stylist', 'Hair Salon Staff', 'Hair Salon Manager', 'System Administrator'],
      f_requirements: [
        '▪ Platform Access: Users can easily access the platform via web or mobile applications.',
        '▪ Appointment Booking and Management:',
        '  - Customers: Can browse available services, select a hair stylist, and book appointments via the web or mobile app.',
        '  - Salon Staff: Can view and manage appointment requests, approve or reject them, and track service status.',
        '▪ Feedback and Rewards: Provide feedback on their service experience and earn loyalty points for regular use of services.',
        '▪ Revenue and Earnings Tracking: Salon Owners track earnings from services provided and manage financial transactions.',
        '▪ Commission and Salary Management: Stylists receive a fixed monthly salary based on their level and a percentage commission of the revenue from their services.',
        '▪ Support and Assistance: The system offers support for appointment-related issues, service inquiries, and technical difficulties.',
        '▪ System Maintenance and Security: IT administrators ensure secure and reliable platform operations, implement robust data security measures, and integrate with third-party services.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'Lâm'
    },
    {
      key: '2',
      id: 15,
      topic_name: 'EduToyRent – Edu Toy Rental Platform',
      context: 'Growing demand for sustainable consumer practices, eco-friendly, cost-effective solutions',
      problems: "High turnover rate of children's toys, need for sustainable practices",
      actors: ['User Renting', 'User Offering', 'Toy Supplier', 'Staff', 'IT Administrators'],
      f_requirements: [
        '▪ Platform Access: Available via web and mobile applications for easy access.',
        '▪ Toy Selection and Submission: Browse, rent, or buy educational toys.',
        '▪ Request Management: System staff verify requests for renting and selling toys.',
        '▪ Tracking and Delivery: Manage shipping of rented or purchased toys.',
        '▪ Revenue and Earnings Tracking: Track income from rentals and sales.',
        '▪ Inventory Management: Efficient management of toy inventories.',
        '▪ Feedback and Rewards: Provide feedback and earn points for rentals.',
        '▪ System Maintenance and Security: Ensure secure and reliable operations.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'CHILTQ'
    },
    {
      key: '3',
      id: 16,
      topic_name: 'TicketResell – Unused Ticket Reselling Platform',
      context: 'High demand for tickets but lack of reliable reselling platforms',
      problems: 'Risk of fraud in informal ticket reselling, financial loss from unused tickets',
      actors: ['General User', 'Staff', 'System Administrator'],
      f_requirements: [
        '▪ User Authentication: Identity verification to prevent fraud.',
        '▪ Ticket Submission: Manage unused tickets for resale.',
        '▪ Search and Filter: Help buyers find relevant tickets.',
        '▪ Chat Functionality: Negotiate prices and discuss details.',
        '▪ Payment Processing: Secure payment for ticket transactions.',
        '▪ Automated Reminders: Notifications about upcoming events and ticket availability.',
        '▪ Feedback and Ratings: Enhance trust through user ratings.',
        '▪ System Maintenance and Security: Ensure safe and reliable transactions.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'CHILTQ'
    },
    {
      key: '4',
      id: 17,
      topic_name: 'PawFund – Platform to support adopting and fundraising for abandoned pets',
      context: 'Abandoned pets need homes, shelters need funding',
      problems: 'Overcrowded shelters, low adoption rates, insufficient funding',
      actors: ['Adopters', 'Donors', 'Shelter Staff', 'Volunteers', 'Admin', 'Guest'],
      f_requirements: [
        '▪ Pet Listings: Shelters can post profiles of pets available for adoption.',
        '▪ Adoption Process: Facilitate application, approval, and tracking of adoptions.',
        '▪ Donation: Allow users to make donations and track contributions.',
        '▪ Search and Filter: Search pets based on criteria (e.g., breed, age).',
        '▪ Notifications: Alerts for new pets, adoption status, and events.',
        '▪ Admin Dashboard: Manage users and resolve platform issues.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'CHILTQ'
    },
    {
      key: '5',
      id: 18,
      topic_name: 'EventFlowerExchange – Platform for Reselling Event Flowers',
      context: 'Event waste from leftover flowers, need for affordable flowers',
      problems: 'Waste of fresh flowers, missed opportunities for sellers, lack of platform',
      actors: ['Surplus Flower Sellers', 'Flower Buyers', 'Delivery Personnel', 'System Administrator'],
      f_requirements: [
        '▪ User Registration: Create profiles for buyers and sellers.',
        '▪ Flower Listings: Manage surplus flower listings with details like type and price.',
        '▪ Online Purchase: Place orders and arrange delivery of flowers.',
        '▪ Order Management: Track and confirm the status of orders.',
        '▪ Notifications: Alerts for new listings and order updates.',
        '▪ Payment Processing: Secure payment for flower transactions.',
        '▪ Review and Feedback: Rate and review flower quality and services.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'CHILTQ'
    },
    {
      key: '6',
      id: 21,
      topic_name: 'STEM Kit Management System with LAB',
      context: 'STEM kits and accompanying LAB materials require streamlined management',
      problems: 'Need for better kit tracking, support, and user account management',
      actors: ['Admin', 'Manager', 'Staff', 'Customer'],
      f_requirements: [
        '▪ Product Management: Manage creation, editing, and organization of STEM kits and LABs.',
        '▪ Order Tracking: Track the delivery of kits and LAB activation.',
        '▪ User Account Management: Manage customer and staff accounts with permissions.',
        '▪ Reporting and Statistics: Generate sales and support reports.',
        '▪ Support: Provide technical support for LABs and track support history.',
        '▪ Payment Processing: Manage online payments for kit purchases.'
      ],
      semester: 'FALL24',
      nf_requirements: [
        '▪ High availability and reliability.',
        '▪ Secure data handling.',
        '▪ User-friendly interface.',
        '▪ Scalability to handle multiple users.'
      ],
      mentor: 'PhuongLHK'
    }
  ];

  const handleGetClick = record => {
    setPayloadProject(prev => ({
      ...prev,
      idTopic: record.id,
      projectName: record.topic_name
    }));
    setShowTopic(false);
  };

  return (
    <div className="border shadow-md rounded-md">
      <Table dataSource={data} pagination={{ pageSize: 5 }} scroll={{ x: '1000px' }} >
        <Column title="ID" dataIndex="id" key="id" className="whitespace-pre-line text-left align-top" />
        <Column
          title="Topic Name"
          dataIndex="topic_name"
          key="topic_name"
          className="whitespace-pre-line text-left align-top w-[100px]"
        />
        <Column
          title="Context"
          dataIndex="context"
          key="topic_name"
          className="whitespace-pre-line text-left align-top w-[1000px]"
        />
        <Column
          title="Problems"
          dataIndex="problems"
          key="problems"
          className="whitespace-pre-line text-left align-top w-[1000px]"
        />
        <Column
          title="Actor"
          dataIndex="actors"
          key="actors"
          className="whitespace-pre-line text-left align-top"
          render={actors => (
            <>
              {actors.map((actor, index) => {
                let color = actor.length > 6 ? 'geekblue' : 'green';
                if (
                  actor.toUpperCase().includes('ADMIN') ||
                  actor.toUpperCase().includes('MANAGER') ||
                  actor.toUpperCase().includes('SYSTEM')
                ) {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={index} className="inline-block mt-1 w-[180px]">
                    {actor.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Functional Requirements"
          dataIndex="f_requirements"
          key="f_requirements"
          className="whitespace-pre-line text-left align-top"
          render={f_requirements => (
            <>
              {f_requirements.map((nf_requirement, index) => {
                return (
                  <p key={index} className="w-[800px]">
                    {nf_requirement}
                  </p>
                );
              })}
            </>
          )}
        />
        <Column
          title="Non-Functional Requirements"
          dataIndex="nf_requirements"
          key="nf_requirements"
          className="whitespace-pre-line text-left align-top"
          render={nf_requirements => (
            <>
              {nf_requirements.map((nf_requirement, index) => {
                return (
                  <p key={index} className="w-[300px]">
                    {nf_requirement}
                  </p>
                );
              })}
            </>
          )}
        />
        <Column title="Author" dataIndex="mentor" key="mentor" className="whitespace-pre-line text-left align-top" />
        <Column
          title="Semester"
          dataIndex="semester"
          key="semester"
          className="whitespace-pre-line text-left align-top"
        />
        <Column
          title="Get Topic"
          key="action"
          className="whitespace-pre-line align-top items-center text-center text-green-500"
          render={(_, record) => (
            <Space size="middle">
              <a className="text-md font-semibold" onClick={() => handleGetClick(record)}>
                Get
              </a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TopicItem;

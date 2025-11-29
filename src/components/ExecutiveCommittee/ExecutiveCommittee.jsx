import React from 'react';
import './executiveCommittee.css';

const ExecutiveCommittee = ({ t }) => {
  const executives = [
    {
      id: 1,
      name: 'คุณสุกิต & คุณอรัญญา สัตปริสัพรพราย',
      position: 'ประธานบริหาร & รองประธานบริหาร',
      image: '/images/Executive/1.jpg',
      isCoPair: true
    },
    {
      id: 2,
      name: 'คุณณวัฒน์ วิทยเพศ สัตปริสัพรพราย',
      position: 'ประธานเจ้าหน้าที่การผลิตการ',
      image: '/images/Executive/2.jpg'
    },
    {
      id: 3,
      name: 'คุณณวัฒน์นพ สัตปริสัพรพราย',
      position: 'ประธานเจ้าหน้าที่บริหาร',
      image: '/images/Executive/3.png'
    },
    {
      id: 4,
      name: 'คุณจิรุณ สัตปริสัพรพราย',
      position: 'ประธานเจ้าหน้าที่ฝ่ายตลาด',
      image: '/images/Executive/4.jpg'
    },
    {
      id: 5,
      name: 'คุณสัตชาวสัย บุญบินนั่น',
      position: 'กรรมการบริหาร',
      image: '/images/Executive/5.jpg'
    },
    {
      id: 6,
      name: 'คุณพิริยะหนิ่ง หลังปเต๊ะ',
      position: 'กรรมการบริหาร',
      image: '/images/Executive/6.jpg'
    },
    {
      id: 7,
      name: 'คุณพรศิพิจ ศูระแก้ว',
      position: 'ผู้อำนวยการฝ่ายบริหาร',
      image: '/images/Executive/7.jpg'
    },
    {
      id: 8,
      name: 'คุณณวัฒน์นพ สัตปริสัพรพราย',
      position: 'ผู้อำนวยการฝ่ายบริหาร',
      image: '/images/Executive/8.jpg'
    }
  ];

  return (
    <section className="executive-committee-section">
      <div className="container">
        <div className="executive-header">
          <h2 className="executive-title">คณะบริหาร</h2>
          <p className="executive-subtitle">ทีมผู้นำที่ขับเคลื่อนวิสัยทัศน์ กลยุทธ์ และการเติบโตระยะยาวของเรา</p>
        </div>

        <div className="executive-grid">
          {executives.map((executive, index) => (
            <div 
              key={executive.id} 
              className={`executive-card ${executive.isCoPair ? 'executive-card-large' : ''}`}
            >
              <div className="executive-image-wrapper">
                <img 
                  src={executive.image} 
                  alt={executive.name}
                  className="executive-image"
                />
              </div>
              <div className="executive-info">
                <h3 className="executive-name">{executive.name}</h3>
                <p className="executive-position">{executive.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;

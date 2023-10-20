import { Card, Row, Col, Input, Button } from 'antd';
import { GiftOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useAuth } from "../../components/AuthContext";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const Wallet = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [giftAmount, setGiftAmount] = useState(0); // State for gift amount
  const [contentAmount, setContentAmount] = useState(0); // State for content amount
  const [mpesaVisible, setMpesaVisible] = useState(false); // State for Mpesa visibility
  const [bankTransferVisible, setBankTransferVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0); // State for withdrawal amount

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);

      // Fetch giftAmount and contentAmount from Firestore
      const fetchAmounts = async () => {
        const userInformationDocRef = doc(
          db,
          'users',
          userEmail,
          'payments',
          user.uid
        );

        const userDocSnapshot = await getDoc(userInformationDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setGiftAmount(userData?.giftAmount || 0);
          setContentAmount(userData?.contentAmount || 0);
        }
      };

      fetchAmounts();
    }
  }, [user, userEmail]);

  // Function to handle withdrawal
  const handleWithdraw = async () => {
    if (withdrawAmount <= 0) {
      // Don't allow negative or zero withdrawals
      return;
    }

    const userInformationDocRef = doc(
      db,
      'users',
      userEmail,
      'payments',
      user.uid
    );

    // Determine which balance to update (gift or content)
    const balanceToUpdate = mpesaVisible ? 'giftAmount' : 'contentAmount';

    // Check if the balance is sufficient
    if (withdrawAmount > (mpesaVisible ? giftAmount : contentAmount)) {
      // Handle insufficient balance error here
      alert('Insufficient balance.');
      return;
    }

    // Decrease the balance locally
    if (mpesaVisible) {
      setGiftAmount(giftAmount - withdrawAmount);
    } else {
      setContentAmount(contentAmount - withdrawAmount);
    }

    // Update the balance in the Firebase database
    await updateDoc(userInformationDocRef, {
      [balanceToUpdate]: db.FieldValue.increment(-withdrawAmount)
    });

    // Reset the withdrawal amount
    setWithdrawAmount(0);
  };

  const handleMpesaClick = () => {
    setMpesaVisible(!mpesaVisible);
    setBankTransferVisible(false);
  };

  const handleBankTransferClick = () => {
    setBankTransferVisible(!bankTransferVisible);
    setMpesaVisible(false);
  };

  return (
    <Card title={`Wallet - ${userEmail}`} style={{ margin: 20 }}>
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <GiftOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            <p>Gift</p>
            {giftAmount > 0 ? (
              <p>Gift Amount: ${giftAmount}</p>
            ) : (
              <p>Your account is empty</p>
            )}
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <DollarCircleOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            <p>Content Payment</p>
            {contentAmount > 0 ? (
              <p>Content Amount: ${contentAmount}</p>
            ) : (
              <p>Your account is empty</p>
            )}
          </div>
        </Col>
     </Row>
     <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <h3>Mpesa</h3>
          <div style={{ textAlign: 'center' }}>
            <img
              src="https://codetribe.co.ke/wp-content/uploads/2020/12/MPESA-API-Integration-Services-kenya.jpg"
              alt="Mpesa"
              style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
              onClick={handleMpesaClick}
            />
            {mpesaVisible && (
              <div>
                <Input
                  placeholder="Phone Number"
                  style={{ marginTop: '10px' }}
                />
                <Input
                  placeholder="Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                />
                <Button
                  type="primary"
                  style={{ marginTop: '10px' }}
                  onClick={handleWithdraw}
                >
                  Withdraw
                </Button>
              </div>
            )}
          </div>
        </Col>
        <Col span={12}>
          <h3>Bank Transfer</h3>
          <div style={{ textAlign: 'center' }}>
            <img
              src="https://lh3.googleusercontent.com/H63dAD9faA4ZXHBFBzwP8RfEE4OFTCopMhfxLuO_BaEir7fNyUOjn0Z0KuBIt5Zvnu_QPtTR0_Mgq1PJEYMxP-bK7iUs42j1HfIRkcVShw=s680"
              alt="Bank Transfer"
              style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
              onClick={handleBankTransferClick}
            />
            {bankTransferVisible && (
              <div>
                <Input
                  placeholder="Bank Account"
                  style={{ marginTop: '10px' }}
                />
                <Input
                  placeholder="Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                />
                <Button
                  type="primary"
                  style={{ marginTop: '10px' }}
                  onClick={handleWithdraw}
                >
                  Withdraw
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Wallet;

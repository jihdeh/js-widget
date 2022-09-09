import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { Theme, Config } from '../../components/configContext';
import style from './style.css';
import PhoneIcon from '../../assets/images/phone.svg';
import HomeIcon from '../../assets/images/home-work.svg';
import Listing from '../../components/listing';

const Home = () => {
  const {
    parts,
    selectedPartsForQuote,
    updateState,
    updatePartState,
    partsPagination,
    brand,
  } = useContext(Theme);

  const { appId } = useContext(Config);

  return (
    <section>
      <div class={style.home}>
        <Listing
          selectedPartsForQuote={selectedPartsForQuote}
          updateState={updateState}
          updatePartState={updatePartState}
          partsPagination={partsPagination}
          parts={parts}
          brand={brand}
          appId={appId}
        />
        <section style="margin-top: 20px;">
          <div>
            <div className={style['partner-contact']}>
              <img src={HomeIcon} />
              <p style="margin:0 5px;">
                {brand.primaryAddress.address1} {'\n'}
              </p>
            </div>
            <p style="margin:0 20px;">
              {brand.primaryAddress.city}, {brand.primaryAddress.state}{' '}
              {brand.primaryAddress.zipcode} {brand.primaryAddress.country}
            </p>
          </div>
          <div>
            <div className={style['partner-contact']}>
              <img src={PhoneIcon} />
              <p>{brand.contactPhone}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;

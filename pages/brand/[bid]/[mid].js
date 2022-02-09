import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';
import Page from '../../../src/components/Page';
import { BASE_URL_IMG, LOAD } from '../../../src/constants';
import { MdKeyboardBackspace, MdBrokenImage } from 'react-icons/md';

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

export default connect(mapStateToProps, null)(function (props) {
  const router = useRouter();
  const { brand } = props;
  const selectedBrand = brand.brands.find(brand => brand.id === router.query.bid) || null;
  const selectedMark = selectedBrand ? selectedBrand.marks.find(mark => mark.id === router.query.mid) || null : null;

  const [image, setImage] = useState({
    load: LOAD.LOADING,
    src: `${BASE_URL_IMG}/${selectedMark?.source || ''}`,
    error: null,
    timeInit: Date.now(),
    timeEnd: NaN,
    opacity: 0
  });

  var title = selectedMark ? selectedMark?.name || '' : '404 | НЕ НАЙДЕНО';
  var body = null;
  if (selectedMark) {
    body = (
      <div>
        <div style={{ padding: '5px', userSelect: 'none' }}>
          <div style={{ display: 'flex' }}>
            <Link href={`/brand/${selectedBrand?.id || ''}`}>
              <a style={{ textDecoration: 'none', padding: '3px', color: 'var(--theme-active)', border: '1px solid var(--theme-active)', fontSize: '1rem', lineHeight: '1rem', textTransform: 'uppercase', display: 'flex' }}>
                <MdKeyboardBackspace />
                {selectedBrand?.name || 'к бренду'}
              </a>
            </Link>
          </div>
        </div>
        <div>
          <img src={image.src} style={{ opacity: image.opacity }} onLoad={() => setImage({
            ...image, timeEnd: Date.now(), load: LOAD.LOADED, opacity: 1
          })} onError={() => setImage({
            ...image, timeEnd: Date.now(), load: LOAD.LOADED, opacity: 0,
            error: '[ERROR]:LOAD/IMAGE'
          })} alt='' />
          {image.error ? <div><MdBrokenImage /></div> : null}
        </div>
      </div>
    );
  };

  return (
    <Page title={title}>
      <div style={{ padding: '10px' }}>
        <h2>{title}</h2>
      </div>
      {body}
    </Page>
  );
});
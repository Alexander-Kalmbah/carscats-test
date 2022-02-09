import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from '../../../src/components/Page';
import card from '../../../src/components/Card/Card';
import editBrand from './../../../src/components/EditBrand/EditBrand';
import { MdNoPhotography, MdOutlineNoPhotography, MdOutlineHideImage, MdSettingsBackupRestore, MdWarningAmber, MdAnnouncement, MdHighlightOff, MdCancelPresentation } from 'react-icons/md';

import { initURL8, secure16url } from '../../../src/lib/secure';
import { BASE_URL_IMG, LOAD, ACTION } from '../../../src/constants';



const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

const initDispatch = action => payload => ({ type: action, payload });
const mapDispatchToProps = {
  DCreateNB: initDispatch(ACTION.CREATE_NEW_BRAND),
  DCancelNB: initDispatch(ACTION.CANCEL_NEW_BRAND),
  DSaveND: payload => initDispatch(ACTION.SAVE_NEW_BRAND)({ id: initURL8(), ...payload }),
  DChangeNameND: initDispatch(ACTION.CHANGE_NAME_NEW_BRAND),
  DAddMark: payload => initDispatch(ACTION.ADD_MARK_IN_NEW_BRAND)({ id: secure16url(), ...payload }),
  DRemoveMark: initDispatch(ACTION.REMOVE_MARK_IN_NEW_BRAND),
  DChangeNameMNB: initDispatch(ACTION.CHANGE_NAME_MARK_IN_NEW_BRAND),
  DChangeImgMNB: initDispatch(ACTION.CHANGE_IMAGE_MARK_IN_NEW_BRAND)
};

export default connect(mapStateToProps, mapDispatchToProps)(function Brand(props) {
  const router = useRouter();
  const { brand } = props;
  const selectedBrand = brand.brands.find(brand => brand.id === router.query.bid) || null;
  const editor = brand.editor;
  const brandEdit = editor.brand;

  if (brand.status === LOAD.LOADING) {
    // TODO
  } else if (brand.status === LOAD.LOADED) {
    if (brand.error) {
      // TODO
    }
  }

  var bodyEditor = null;
  if (brandEdit) {
    const checkedErr = editor?.error?.ref === 'field_brand_name';

    bodyEditor = (
      <>
        <div className={editBrand.style.nameBlock}>
          <label className={editBrand.style.nameLabel} data-status={checkedErr ? 'ERROR' : brandEdit?.isNameUnique ? 'WARNING' : ''}>
            <input className={editBrand.style.name} type="text" placeholder='название бренда' value={brandEdit?.name} onChange={e => props.DChangeNameND({ name: e.target.value })} />
            {
              checkedErr ?
                <div className={`${editBrand.style.nameStatusIcon} ${editBrand.style._error}`}>
                  <MdAnnouncement />
                </div>
                : null
            }
          </label>
        </div>
        {
          editor.error ?
            <div className={editBrand.style.msgError}>
              <div className={editBrand.style.msgErrorIcon}>
                <MdWarningAmber />
              </div>
              <div className={editBrand.style.msgErrorText}>
                <p>Ошибка</p>
              </div>
            </div>
            : null
        }
        <div className={editBrand.style.marks}>
          <ul className={editBrand.style.marksList}>
            {
              (brandEdit?.marks || []).map(mark => {
                if (!mark) { return null }
                return (
                  <li key={mark.id} className={editBrand.style.mark}>
                    <div className={editBrand.style.markBody}>
                      <div className={editBrand.style.markNameBlock}>
                        <label className={editBrand.style.markNameLabel}>
                          <input className={editBrand.style.markName} type="text" placeholder='марка авто' value={mark?.name || ''} onChange={e => props.DChangeNameMNB({ id: mark?.id, name: e.target.value })} />
                        </label>
                      </div>
                      <div className={editBrand.style.markActions}>
                        <a className={editBrand.style.markRemove} onClick={() => props.DRemoveMark({ id: mark.id })}><MdCancelPresentation /></a>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <div className={editBrand.style.btns}>
            <button className={editBrand.style.btn} onClick={() => props.DAddMark()}>Добавить модель</button>
          </div>
        </div>
        <div style={{ margin: 'auto' }}></div>
        <div className={`${editBrand.style.btns} ${editBrand.style.footer}`}>
          <button className={`${editBrand.style.btn} ${editBrand.style._failure}`} onClick={() => props.DCancelNB()}>Отмена</button>
          <button className={`${editBrand.style.btn} ${editBrand.style._success}`} onClick={() => props.DSaveND()}>Сохранить</button>
        </div>
      </>
    );
  } else {
    bodyEditor = (
      <>
        <div style={{ margin: 'auto' }}>

        </div>
        <div className={`${editBrand.style.btns} ${editBrand.style.footer}`}>
          <button className={`${editBrand.style.btn} ${editBrand.style._active}`} onClick={() => props.DCreateNB()}>Добавить</button>
        </div>
      </>
    );
  };

  if (selectedBrand) {
    const marks = selectedBrand.marks || [];
    return (
      <Page title={selectedBrand.name}>

        <div className='jsx_block'>
          <div className='jsx_main'>
            <div className='jsx_header'>
              <h2 className='jsx_title'>{selectedBrand.name}</h2>
            </div>
            <div className='jsx_cards'>
              {marks.map(mark => <Mark key={mark.id} mark={mark} brand={selectedBrand} />)}
            </div>
          </div>

          <div className='jsx_aside'>
            <div className='jsx_editor'>
              <div className='jsx_eHeader'>
                <h3 className='jsx_eTitle'>Добавить каталог</h3>
              </div>
              <div className='jsx_eBody'>
                {bodyEditor}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .jsx_block {
            display: flex;
            height: 100%;
          }
          .jsx_main {
            flex: 1 1 auto;
          }
          .jsx_header {
            padding: 10px 10px 10px 20px;
          }
          .jsx_title {
            font-size: 1.5rem;
            color: var(--theme-primary);
          }
          .jsx_cards {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
          }
          .jsx_aside {
            flex: 0 0 320px;
            max-width: 320px;
            min-height: 100%;
          }
          .jsx_editor {
            box-sizing: border-box;
            min-height: 100%;
            background: var(--theme-nearest);
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
          }
          .jsx_eHeader {
            padding: 5px;
            flex: 0 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 65px;
            box-sizing: border-box;
          }
          .jsx_eTitle {
            text-decoration: none;
            font-size: 1.2rem;
            user-select: none;
          }
          .jsx_eBody {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
          }
        `}</style>

      </Page>
    );
  }

  return (
    <Page title="нету">
      <div>
        <div>
          <h3>404 | НЕ НАЙДЕНО</h3>
        </div>
        <div>
          <p>Бренд [{router.query.bid}] не существует!</p>
        </div>
      </div>
    </Page>
  );
});

const Mark = ({ mark, brand }) => {
  const [image, setImage] = useState({
    load: LOAD.LOADING,
    src: mark.source || '',
    error: null,
    w: 0, h: 0,
    body: null,
    timeInit: Date.now(),
    icon: [<MdNoPhotography />, <MdOutlineNoPhotography />, <MdOutlineHideImage />][Math.random() * 3 | 0]
  });

  useEffect(() => {
    const img = document.createElement('img');

    img.onload = () => {
      setImage({
        ...image,
        load: LOAD.LOADED,
        error: null,
        w: img.naturalWidth || img.width || 0,
        h: img.naturalHeight || img.height || 0,
        timeEnd: Date.now(),
        body: img
      });
    };
    img.onerror = () => {
      setImage({ ...image, load: LOAD.LOADED, error: '[ERROR] load', body: img });
    };

    img.src = `${BASE_URL_IMG}/${mark.source || ''}`;
  }, []);


  return (
    <div className={card.style.card} data-load={image.error ? 'ERROR' : image.load === LOAD.LOADED ? 'GOOD' : ''}>
      <div className={card.style.imgBlock}>
        {
          image.load === LOAD.LOADING ?
            <div className={card.style.imgLoading}><MdSettingsBackupRestore /></div> :
            image.load === LOAD.LOADED && !image.error ?
              <img src={image?.body?.src} className={card.style.image} width={image.w} height={image.h} /> :
              <div className={card.style.imgError}>{image.icon}</div>
        }
      </div>
      <div className={card.style.mainInfo}>
        <h4 className={card.style.title}>{mark.name}</h4>
        <div className={card.style.footer}>
          <Link href={`/brand/${mark.brandId}/${mark.id}`}>
            <a className={card.style.link}>открыть</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

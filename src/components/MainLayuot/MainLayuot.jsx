import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { MdCached, MdWarningAmber, MdPriorityHigh, MdFolderOpen, MdLinearScale, MdBuild } from 'react-icons/md';
import { ACTION, LOAD } from '../../constants';

import style from './MainLayuot.module.css';



//#region maps redux
const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

const initDispatch = action => payload => ({ type: action, payload });
const mapDispatchToProps = {
  DChangeViewN: initDispatch(ACTION.CHANGE_VIEW_NAVBAR),
  DChangeViewE: initDispatch(ACTION.CHANGE_VIEW_EDITOR),

  DReqBrands: initDispatch(ACTION.REQ_BRANDS),
  DResBrands: initDispatch(ACTION.RES_BRANDS)
};
//#endregion


export default connect(mapStateToProps, mapDispatchToProps)(function MainLayout(props) {
  const { brand, children } = props;
  const brands = brand.brands || [];

  useEffect(()=>{
    if(brand.status === LOAD.VOID) {
      props.DReqBrands({});

      axios.get('/api/brand').then(res => {
        props.DResBrands({ response: res });
      }).catch(reason => {
        console.warn(reason);
        props.DResBrands({ error: new Error('BAD RESPONSE') });
      });
    };
  },[]);
  
  var brandInfo = null;
  if (brand.status === LOAD.LOADING) {
    brandInfo = (
      <div className={style.brandStatus} data-status="LOADING">
        <div className={style.brandStatusBody}>
          <MdCached /><div className={style.brandStatusText}>загрузка</div>
        </div>
      </div>
    );
  } else if (brand.status === LOAD.LOADED) {
    if (brand.error) {
      brandInfo = (
        <div className={style.brandStatus} data-status="ERROR">
          <div className={style.brandStatusBody}>
            <MdWarningAmber /><div className={style.brandStatusText}>ошибка</div>
          </div>
        </div>
      );
    } else if (!brands.length) {
      brandInfo = (
        <div className={style.brandStatus} data-status="WARNING">
          <div className={style.brandStatusBody}>
            <MdFolderOpen /><div className={style.brandStatusText}>список пуст</div>
          </div>
        </div>
      );
    }
  }


  return (
    <>
      <div className={style.wrapper}>
        <header className={style.header}>
          <div className={style.headerBtn} data-view={brand.navbar.view ? 'show' : 'hide'}>
            <a className={style.action} onClick={e => { props.DChangeViewN(!brand.navbar.view); e.preventDefault() }}>
              <MdLinearScale style={{ transform: 'rotate(90deg)' }} />
            </a>
          </div>

          <div className={style.logoBlock}>
            <Link href="/">
              <a className={style.logoLink}>
                <h3>Тестовое задание</h3>
              </a>
            </Link>
          </div>

          <div className={style.headerBtn} data-view={brand.editor.view ? 'show' : 'hide'} style={{ display: 'none' }}>
            <a className={style.action} onClick={e => { props.DChangeViewE(!brand.editor.view); e.preventDefault() }}>
              <MdBuild />
            </a>
          </div>
        </header>

        <div className={style.body}>
          <aside className={`${style.aside} ${brand.navbar.view ? '' : style.hide}`}>
            <nav className={style.asideBlock}>
              <div className={style.navLinkBlock} style={{ height: '65px' }}>
                <h3 className={style.navHeader}>Мои каталоги</h3>
              </div>

              {brands.map(brand => <BrandLink key={brand.id} brand={brand} />)}
              {brandInfo}
            </nav>
          </aside>
          <div className={`${style.backscreen} ${brand.navbar.view ? '' : style.hide}`}></div>
          <main className={style.main}>
            <div className={style.page}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
});

// --------

const BrandLink = ({ brand }) => {
  const router = useRouter();
  const [to, pn] = [`/brand/${brand.id}`, router.asPath];
  const isActive = pn === to;

  return (
    <div className={style.navLinkBlock} data-active={isActive ? 'YES' : 'NO'}>
      <Link href={to}>
        <a className={style.navLink}>
          <p>{brand.name || '-'}</p>
        </a>
      </Link>
    </div>
  );
};

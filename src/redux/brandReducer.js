import { LOAD, ACTION, $MARK_IMAGES } from "../constants";


const initialState = {
  status: LOAD.VOID,
  error: null, // null | Error

  navbar: { view: false },
  editor: {
    view: false,

    brand: null,
    error: null
  },

  brands: []
};


export const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CHANGE_VIEW_NAVBAR: return ActionChangeViewN(state, action.payload);
    case ACTION.CHANGE_VIEW_EDITOR: return ActionChangeViewE(state, action.payload);

    case ACTION.REQ_BRANDS: return ActionReqBrands(state, action.payload);
    case ACTION.RES_BRANDS: return ActionResBrands(state, action.payload);

    case ACTION.CREATE_NEW_BRAND: return ActionCreateNB(state, action.payload);
    case ACTION.CANCEL_NEW_BRAND: return ActionCancelNB(state, action.payload);
    case ACTION.SAVE_NEW_BRAND: return ActionSaveNB(state, action.payload);
    case ACTION.CHANGE_NAME_NEW_BRAND: return ActionChangeNameNB(state, action.payload);

    case ACTION.ADD_MARK_IN_NEW_BRAND: return ActionAddMNB(state, action.payload);
    case ACTION.REMOVE_MARK_IN_NEW_BRAND: return ActionRemoveMNB(state, action.payload);
    case ACTION.CHANGE_NAME_MARK_IN_NEW_BRAND: return ActionChangeNameMNB(state, action.payload);
    case ACTION.CHANGE_IMAGE_MARK_IN_NEW_BRAND: return ActionChangeImageMNB(state, action.payload);

    default: return state;
  };
};

// --------

const ActionChangeViewN = function (state, payload) {
  const ns = { ...state };
  ns.navbar = { ...ns.navbar };

  ns.navbar.view = !!payload;
  if (ns.navbar.view && ns.editor.view) {
    ns.editor = { ...ns.editor, view: false };
  }

  return ns;
};

const ActionChangeViewE = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  ns.editor.view = !!payload;
  if (ns.navbar.view && ns.editor.view) {
    ns.navbar = { ...ns.navbar, view: false };
  }

  return ns;
};

const ActionReqBrands = function (state, payload) {
  const ns = { ...state };

  ns.status = LOAD.LOADING;

  return ns;
};
const ActionResBrands = function (state, payload) {
  const ns = { ...state };

  ns.status = LOAD.LOADED;

  if(payload.error) {
    ns.error = payload.error;
  } else {
    var brands = payload?.response?.data?.brands;
    if(!(brands instanceof Array)) { brands = []; };

    ns.brands = brands;
  };

  return ns;
};

const ActionCreateNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  ns.editor.error = null;
  ns.editor.brand = {
    name: '',
    marks: []
  };

  return ns;
};

const ActionCancelNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  ns.editor.error = null;
  ns.editor.brand = null;

  return ns;
};

const ActionSaveNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  const id = payload?.id;

  if (!id) {
    ns.editor.error = {
      data: payload,
      message: 'save invalid data | id void',
    };
    return ns;
  };
  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'save invalid data | brand empty',
    };
    return ns;
  };
  if (!ns.editor.brand.name) {
    ns.editor.error = {
      data: payload,
      message: 'save invalid data | brand name required',
      ref: 'field_brand_name'
    };
    return ns;
  };

  const brandId = id;

  ns.brands = [
    ...ns.brands,
    {
      id: brandId,
      name: ns.editor.brand.name,
      marks: ns.editor.brand.marks.map(mark => ({ id: mark.id, brandId, name: mark.name, source: mark.image_src || '' })),
      isNameUnique: false,

      timeSave: new(Date)().toJSON()
    }
  ];
  ns.editor.brand = null;

  return ns;
};

const ActionChangeNameNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'Brand is null | change name of invalid brand',
    };
    return ns;
  };

  ns.editor.brand = {
    ...ns.editor.brand,
    name: payload?.name || '',
    isNameUnique: !!ns.brands.find(brand => (payload?.name) && (brand.name === payload?.name))
  };

  return ns;
};

const ActionAddMNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  const id = payload?.id;

  if (!id) {
    ns.editor.error = {
      data: payload,
      message: 'data invalid | add mark of invalid id',
    };
    return ns;
  };
  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'Brand is null | add mark of invalid brand',
    };
    return ns;
  };

  ns.editor.brand = {
    ...ns.editor.brand,
    marks: [...ns.editor.brand.marks, {
      id,
      name: '',
      image_src: payload.image_src || $MARK_IMAGES[Math.random() * $MARK_IMAGES.length * 1.2 | 0]?.key || ''
    }]
  };

  return ns;
};

const ActionRemoveMNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  const queryId = payload?.id;

  if (!queryId) {
    ns.editor.error = {
      data: payload,
      message: 'Mark id is void | can`t search',
    };
    return ns;
  };
  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'Brand is null | remove mark of invalid brand',
    };
    return ns;
  };

  ns.editor.brand = { ...ns.editor.brand };

  const marks = ns.editor.brand.marks;
  var index = -1;
  var found = null;

  found = marks.find((mark, i) => {
    if (mark?.id === queryId) {
      index = i;
      return true;
    };
  });

  if (index === -1) {
    ns.editor.error = {
      data: payload,
      message: 'Mark not found | failure search by id',
    };
    return ns;
  };

  marks.splice(index, 1);
  ns.editor.brand.marks = [...marks];

  return ns;
};

const ActionChangeNameMNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  const queryId = payload?.id;

  if (!queryId) {
    ns.editor.error = {
      data: payload,
      message: 'Mark id is void | can`t search',
    };
    return ns;
  };
  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'Brand is null | remove mark of invalid brand',
    };
    return ns;
  };

  ns.editor.brand = { ...ns.editor.brand };

  const marks = ns.editor.brand.marks;
  var index = -1;
  var found = null;

  found = marks.find((mark, i) => {
    if (mark?.id === queryId) {
      index = i;
      return true;
    };
  });

  if (index === -1) {
    ns.editor.error = {
      data: payload,
      message: 'Mark not found | failure search by id',
    };
    return ns;
  };

  marks[index] = { ...marks[index], name: payload?.name || '' };
  ns.editor.brand.marks = [...marks];

  return ns;
};

const ActionChangeImageMNB = function (state, payload) {
  const ns = { ...state };
  ns.editor = { ...ns.editor };

  const queryId = payload?.id;

  if (!queryId) {
    ns.editor.error = {
      data: payload,
      message: 'Mark id is void | can`t search',
    };
    return ns;
  };
  if (!ns.editor.brand) {
    ns.editor.error = {
      data: payload,
      message: 'Brand is null | remove mark of invalid brand',
    };
    return ns;
  };

  ns.editor.brand = { ...ns.editor.brand };

  const marks = ns.editor.brand.marks;
  var index = -1;
  var found = null;

  found = marks.find((mark, i) => {
    if (mark?.id === queryId) {
      index = i;
      return true;
    };
  });

  if (index === -1) {
    ns.editor.error = {
      data: payload,
      message: 'Mark not found | failure search by id',
    };
    return ns;
  };

  ns.editor.brand.marks = [...marks];
  marks[index] = { ...marks[index], image_src: payload?.src || '' };

  return ns;
};
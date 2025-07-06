export const locales = ['en', 'ru', 'uz', 'kr'] as const;
export type Locale = (typeof locales)[number];

export enum TranslationKeys {
  // Header
  HeaderLogo = 'header.logo',
  Search = 'header.search',
  ContactUs = 'header.contactUs',

  // Card
  MoreDetails = 'card.more_details',

  // Filters
  FiltersAll = 'filters.all',
  FiltersNeva = 'filters.neva',
  FiltersXSolution = 'filters.xSolution',
  FiltersNoBrands = 'filters.noBrands',

  // Products
  ProductsNoMore = 'products.noMore',
  ProductsLoading = 'products.loading',

  // Errors
  ErrorsBrands = 'errors.brands',
  ErrorsUnknown = 'errors.unknown',

  // Auth
  AuthTitle = 'auth.title',
  AuthSubtitle = 'auth.subtitle',
  AuthUsername = 'auth.username',
  AuthPassword = 'auth.password',
  AuthUsernameRequired = 'auth.usernameRequired',
  AuthUsernameMinLength = 'auth.usernameMinLength',
  AuthPasswordRequired = 'auth.passwordRequired',
  AuthPasswordMinLength = 'auth.passwordMinLength',
  AuthLoginButton = 'auth.loginButton',
  AuthLoggingIn = 'auth.loggingIn',
  AuthInvalidCredentials = 'auth.invalidCredentials',
  AuthServerError = 'auth.serverError',
  AuthNetworkError = 'auth.networkError',
  AuthUnexpectedError = 'auth.unexpectedError',
  AuthUsernamePlaceholder = 'auth.usernamePlaceholder',
  AuthPasswordPlaceholder = 'auth.passwordPlaceholder',
  AuthLoading = 'auth.loading',

  // Admin
  AdminLogout = 'auth.dashboard.logout',

  // Admin Home
  AdminHomeTitle = 'admin_home.title',
  AdminHomeSubtitle = 'admin_home.subtitle',
  AdminHomeStatsProductsTitle = 'admin_home.stats.products.title',
  AdminHomeStatsProductsDescription = 'admin_home.stats.products.description',
  AdminHomeStatsCategoriesTitle = 'admin_home.stats.categories.title',
  AdminHomeStatsCategoriesDescription = 'admin_home.stats.categories.description',
  AdminHomeStatsSubcategoriesTitle = 'admin_home.stats.subcategories.title',
  AdminHomeStatsSubcategoriesDescription = 'admin_home.stats.subcategories.description',
  AdminHomeStatsBrandsTitle = 'admin_home.stats.brands.title',
  AdminHomeStatsBrandsDescription = 'admin_home.stats.brands.description',
  AdminHomeLoading = 'admin_home.loading',
  AdminHomeErrorTitle = 'admin_home.error.title',
  AdminHomeErrorDescription = 'admin_home.error.description',
  AdminHomeErrorDemo = 'admin_home.error.demo',

  // Sidebar
  SidebarDashboard = 'sidebar.dashboard',
  SidebarProductsCreate = 'sidebar.productsCreate',
  SidebarProductsList = 'sidebar.productsList',
  SidebarBrandsCreate = 'sidebar.brandsCreate',
  SidebarCloseMenu = 'sidebar.closeMenu',
  SidebarAdminNavigation = 'sidebar.adminNavigation',
  SidebarLogoTitle = 'sidebar.logoTitle',
  SidebarLogoSubtitle = 'sidebar.logoSubtitle',
  SidebarBack = 'sidebar.back',

  // Product Create
  ProductCreateTitle = 'product_create.title',
  ProductCreateSubtitle = 'product_create.subtitle',
  ProductCreateSectionsBasicInfoTitle = 'product_create.sections.basicInfo.title',
  ProductCreateSectionsBasicInfoDescription = 'product_create.sections.basicInfo.description',
  ProductCreateSectionsImagesTitle = 'product_create.sections.images.title',
  ProductCreateSectionsImagesDescription = 'product_create.sections.images.description',
  ProductCreateSectionsDetailsTitle = 'product_create.sections.details.title',
  ProductCreateSectionsDetailsDescription = 'product_create.sections.details.description',
  ProductCreateFieldsSectionLabel = 'product_create.fields.section.label',
  ProductCreateFieldsSectionPlaceholder = 'product_create.fields.section.placeholder',
  ProductCreateFieldsSectionRequired = 'product_create.fields.section.required',
  ProductCreateFieldsCategoryLabel = 'product_create.fields.category.label',
  ProductCreateFieldsCategoryPlaceholder = 'product_create.fields.category.placeholder',
  ProductCreateFieldsCategoryLoading = 'product_create.fields.category.loading',
  ProductCreateFieldsCategorySelectSectionFirst = 'product_create.fields.category.selectSectionFirst',
  ProductCreateFieldsCategoryRequired = 'product_create.fields.category.required',
  ProductCreateFieldsSubcategoryLabel = 'product_create.fields.subcategory.label',
  ProductCreateFieldsSubcategoryPlaceholder = 'product_create.fields.subcategory.placeholder',
  ProductCreateFieldsSubcategoryLoading = 'product_create.fields.subcategory.loading',
  ProductCreateFieldsSubcategorySelectCategoryFirst = 'product_create.fields.subcategory.selectCategoryFirst',
  ProductCreateFieldsSubcategoryNotAvailable = 'product_create.fields.subcategory.notAvailable',
  ProductCreateFieldsBrandLabel = 'product_create.fields.brand.label',
  ProductCreateFieldsBrandPlaceholder = 'product_create.fields.brand.placeholder',
  ProductCreateFieldsBrandLoading = 'product_create.fields.brand.loading',
  ProductCreateFieldsBrandSelectSubcategoryFirst = 'product_create.fields.brand.selectSubcategoryFirst',
  ProductCreateFieldsBrandNotAvailable = 'product_create.fields.brand.notAvailable',
  ProductCreateFieldsProductNameLabel = 'product_create.fields.productName.label',
  ProductCreateFieldsProductNamePlaceholder = 'product_create.fields.productName.placeholder',
  ProductCreateFieldsProductNameRequired = 'product_create.fields.productName.required',
  ProductCreateFieldsArticleNumberLabel = 'product_create.fields.articleNumber.label',
  ProductCreateFieldsArticleNumberPlaceholder = 'product_create.fields.articleNumber.placeholder',
  ProductCreateFieldsPriceLabel = 'product_create.fields.price.label',
  ProductCreateFieldsPricePlaceholder = 'product_create.fields.price.placeholder',
  ProductCreateSectionsNamesNeva = 'product_create.sections_names.neva',
  ProductCreateSectionsNamesXSolution = 'product_create.sections_names.x_solution',
  ProductCreateLoadingCategories = 'product_create.loading.categories',
  ProductCreateLoadingSubcategories = 'product_create.loading.subcategories',
  ProductCreateLoadingBrands = 'product_create.loading.brands',
  ProductCreateFieldsProductDescriptionLabelRu = 'product_create.fields.productDescription.label_ru',
  ProductCreateFieldsProductDescriptionLabelEn = 'product_create.fields.productDescription.label_en',
  ProductCreateFieldsProductDescriptionLabelUz = 'product_create.fields.productDescription.label_uz',
  ProductCreateFieldsProductDescriptionLabelKr = 'product_create.fields.productDescription.label_kr',
  ProductCreateFieldsProductDescriptionPlaceholder = 'product_create.fields.productDescription.placeholder',
  ProductCreateFieldsProductDescriptionSpecificationsLabel = 'product_create.fields.productDescription.specifications.label',
  ProductCreateFieldsProductDescriptionSpecificationsPlaceholder = 'product_create.fields.productDescription.specifications.placeholder',
  ProductCreateFieldsProductNameLabelRu = 'product_create.fields.productName.labelRu',
  ProductCreateFieldsProductNameLabelEn = 'product_create.fields.productName.labelEn',
  ProductCreateFieldsProductNameLabelUz = 'product_create.fields.productName.labelUz',
  ProductCreateFieldsProductNameLabelKr = 'product_create.fields.productName.labelKr',

  // Admin Products List
  AdminProductsListTitle = 'admin_products_list.title',
  AdminProductsListTotalProducts = 'admin_products_list.totalProducts',
  AdminProductsListLoadedProducts = 'admin_products_list.loadedProducts',
  AdminProductsListDeleteModeActive = 'admin_products_list.deleteModeActive',
  AdminProductsListLoadMore = 'admin_products_list.loadMore',
  AdminProductsListLoading = 'admin_products_list.loading',
  AdminProductsListAuthCheck = 'admin_products_list.authCheck',
  AdminProductsListConfirmDeleteTitle = 'admin_products_list.confirmDelete.title',
  AdminProductsListConfirmDeleteMessage = 'admin_products_list.confirmDelete.message',
  AdminProductsListConfirmDeleteCancel = 'admin_products_list.confirmDelete.cancel',
  AdminProductsListConfirmDeleteConfirm = 'admin_products_list.confirmDelete.confirm',
  AdminProductsListProductDeletedMessage = 'admin_products_list.productDeleted',
  AdminProductsListHintTitle = 'admin_products_list.hint.title',
  AdminProductsListHintDescription = 'admin_products_list.hint.description',
  AdminProductsListModeInfo = 'admin_products_list.modeInfo',

  // Progress Indicator
  ProgressIndicatorTitle = 'progress_indicator.title',
  ProgressIndicatorCompleted = 'progress_indicator.completed',
  ProgressIndicatorCreateProduct = 'progress_indicator.createProduct',
  ProgressIndicatorReset = 'progress_indicator.reset',
  ProgressIndicatorResetMessage = 'progress_indicator.resetMessage',
  ProgressIndicatorSuccessMessage = 'progress_indicator.successMessage',

  // Brand Create
  BrandCreateTitle = 'brand_create.title',
  BrandCreateSubtitle = 'brand_create.subtitle',
  BrandCreateAuthTokenNotFound = 'brand_create.authTokenNotFound',
  BrandCreateCreateError = 'brand_create.createError',
  BrandCreateCreateSuccess = 'brand_create.createSuccess',
  BrandCreateFormReset = 'brand_create.formReset',
  BrandCreateSubmitButton = 'brand_create.submitButton',
  BrandCreateResetButton = 'brand_create.resetButton',
  BrandCreateProgressTitle = 'brand_create.progressTitle',
  BrandCreateCreating = 'brand_create.creating',

  // Brand Form
  BrandFormBasicInfo = 'brand_form.basicInfo',
  BrandFormDescription = 'brand_form.description',
  BrandFormSectionLabel = 'brand_form.sectionLabel',
  BrandFormSelectSection = 'brand_form.selectSection',
  BrandFormCategoryLabel = 'brand_form.categoryLabel',
  BrandFormLoadingCategories = 'brand_form.loadingCategories',
  BrandFormSelectCategory = 'brand_form.selectCategory',
  BrandFormSelectSectionFirst = 'brand_form.selectSectionFirst',
  BrandFormSubcategoryLabel = 'brand_form.subcategoryLabel',
  BrandFormLoadingSubcategories = 'brand_form.loadingSubcategories',
  BrandFormSelectSubcategory = 'brand_form.selectSubcategory',
  BrandFormSelectCategoryFirst = 'brand_form.selectCategoryFirst',
  BrandFormBrandNameLabel = 'brand_form.brandNameLabel',
  BrandFormEnterBrandName = 'brand_form.enterBrandName',

  // Product Detail
  ProductDetailImageAlt = 'product_detail.imageAlt',
  ProductDetailImageUnavailable = 'product_detail.imageUnavailable',
  ProductDetailSpecifications = 'product_detail.specifications',
  ProductDetailNoSpecifications = 'product_detail.noSpecifications',
  ProductDetailCallToLearnMore = 'product_detail.callToLearnMore',

  // Product Card
  ProductCardDelete = 'product_card.delete',
  ProductCardNoImage = 'product_card.noImage',

  // Category Modal
  CategoryModalNoCategories = 'category_modal.noCategories',
  CategoryModalBack = 'category_modal.back',
  CategoryModalNoBrands = 'category_modal.noBrands',
  CategoryModalTitle = 'category_modal.title',

  // Image Slot
  ImageSlotFormatError = 'image_slot.formatError',
  ImageSlotSizeError = 'image_slot.sizeError',
  ImageSlotImageLabel = 'image_slot.imageLabel',
  ImageSlotAddImageLabel = 'image_slot.addImageLabel',
  ImageSlotSetPrimary = 'image_slot.setPrimary',
  ImageSlotSetPrimaryImage = 'image_slot.setPrimaryImage',
  ImageSlotDeleteImage = 'image_slot.deleteImage',
  ImageSlotPrimary = 'image_slot.primary',

  // Action Bar
  ActionBarSave = 'action_bar.save',
  ActionBarReset = 'action_bar.reset',
  ActionBarFilled = 'action_bar.filled',
  ActionBarSaving = 'action_bar.saving',
  ActionBarFillRequired = 'action_bar.fillRequired',

  // Inline Action Bar
  InlineActionBarSave = 'inline_action_bar.save',
  InlineActionBarReset = 'inline_action_bar.reset',
  InlineActionBarProgressTitle = 'inline_action_bar.progressTitle',
  InlineActionBarFieldsFilledText = 'inline_action_bar.fieldsFilledText',
  InlineActionBarFillRequiredFields = 'inline_action_bar.fillRequiredFields',
  InlineActionBarAllFieldsFilled = 'inline_action_bar.allFieldsFilled',
  InlineActionBarCreating = 'inline_action_bar.creating',
  InlineActionBarSubmit = 'inline_action_bar.submit',
  InlineActionBarOf = 'inline_action_bar.of',

  // Form Progress
  FormProgressCloseError = 'form_progress.closeError',

  // Selects
  SelectDefaultPlaceholder = 'select.defaultPlaceholder',
  SearchSelectDefaultPlaceholder = 'search_select.defaultPlaceholder',
  SearchSelectSearchPlaceholder = 'search_select.searchPlaceholder',
}

export type Header = {
  logo: string;
  search: string;
  contactUs: string;
  [key: string]: string;
};

export type Card = {
  more_details: string;
  [key: string]: string;
};

export type Filters = {
  all: string;
  neva: string;
  xSolution: string;
  noBrands: string;
  [key: string]: string;
};

export type Products = {
  noMore: string;
  loading: string;
  [key: string]: string;
};

export type Errors = {
  brands: string;
  unknown: string;
  [key: string]: string;
};

export type Auth = {
  title: string;
  subtitle: string;
  username: string;
  password: string;
  usernameRequired: string;
  usernameMinLength: string;
  passwordRequired: string;
  passwordMinLength: string;
  loginButton: string;
  loggingIn: string;
  invalidCredentials: string;
  serverError: string;
  networkError: string;
  unexpectedError: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  loading: string;
  dashboard: {
    title: string;
    welcome: string;
    logout: string;
    users: string;
    usersDescription: string;
    settings: string;
    settingsDescription: string;
    reports: string;
    reportsDescription: string;
    statistics: string;
    statisticsDescription: string;
    systemStatus: string;
  };
  [key: string]: unknown;
};

export type AdminHome = {
  title: string;
  subtitle: string;
  stats: {
    products: {
      title: string;
      description: string;
    };
    categories: {
      title: string;
      description: string;
    };
    subcategories: {
      title: string;
      description: string;
    };
    brands: {
      title: string;
      description: string;
    };
  };
  loading: string;
  error: {
    title: string;
    description: string;
    demo: string;
  };
  [key: string]: unknown;
};

export type Sidebar = {
  dashboard: string;
  productsCreate: string;
  productsList: string;
  brandsCreate: string;
  closeMenu: string;
  adminNavigation: string;
  logoTitle: string;
  logoSubtitle: string;
  back: string;
  [key: string]: unknown;
};

export type ProductCreate = {
  title: string;
  subtitle: string;
  sections: {
    basicInfo: {
      title: string;
      description: string;
    };
    images: {
      title: string;
      description: string;
    };
    details: {
      title: string;
      description: string;
    };
  };
  fields: {
    section: {
      label: string;
      placeholder: string;
      required: string;
    };
    category: {
      label: string;
      placeholder: string;
      loading: string;
      selectSectionFirst: string;
      required: string;
    };
    subcategory: {
      label: string;
      placeholder: string;
      loading: string;
      selectCategoryFirst: string;
      notAvailable: string;
    };
    brand: {
      label: string;
      placeholder: string;
      loading: string;
      selectSubcategoryFirst: string;
      notAvailable: string;
    };
    productName: {
      label: string;
      placeholder: string;
      required: string;
    };
    articleNumber: {
      label: string;
      placeholder: string;
    };
    price: {
      label: string;
      placeholder: string;
    };
  };
  sections_names: {
    neva: string;
    x_solution: string;
  };
  loading: {
    categories: string;
    subcategories: string;
    brands: string;
  };
  [key: string]: unknown;
};

export type AdminProductsList = {
  title: string;
  totalProducts: string;
  loadedProducts: string;
  deleteModeActive: string;
  loadMore: string;
  loading: string;
  authCheck: string;
  confirmDelete: {
    title: string;
    message: string;
    cancel: string;
    confirm: string;
  };
  productDeleted: string;
  hint: {
    title: string;
    description: string;
  };
  modeInfo: string;
  [key: string]: unknown;
};

export type ProgressIndicator = {
  title: string;
  completed: string;
  createProduct: string;
  reset: string;
  resetMessage: string;
  successMessage: string;
  [key: string]: unknown;
};

export type BrandCreate = {
  title: string;
  subtitle: string;
  authTokenNotFound: string;
  createError: string;
  createSuccess: string;
  formReset: string;
  submitButton: string;
  resetButton: string;
  progressTitle: string;
  creating: string;
  [key: string]: unknown;
};

export type BrandForm = {
  basicInfo: string;
  description: string;
  sectionLabel: string;
  selectSection: string;
  categoryLabel: string;
  loadingCategories: string;
  selectCategory: string;
  selectSectionFirst: string;
  subcategoryLabel: string;
  loadingSubcategories: string;
  selectSubcategory: string;
  selectCategoryFirst: string;
  brandNameLabel: string;
  enterBrandName: string;
  [key: string]: unknown;
};

export type ProductDetail = {
  imageAlt: string;
  imageUnavailable: string;
  specifications: string;
  noSpecifications: string;
  callToLearnMore: string;
  [key: string]: unknown;
};

export type ProductCard = {
  delete: string;
  noImage: string;
  [key: string]: unknown;
};

export type CategoryModal = {
  noCategories: string;
  back: string;
  noBrands: string;
  title: string;
  [key: string]: unknown;
};

export type ImageSlot = {
  formatError: string;
  sizeError: string;
  imageLabel: string;
  addImageLabel: string;
  setPrimary: string;
  setPrimaryImage: string;
  deleteImage: string;
  primary: string;
  [key: string]: unknown;
};

export type ActionBar = {
  save: string;
  reset: string;
  filled: string;
  saving: string;
  fillRequired: string;
  [key: string]: unknown;
};

export type InlineActionBar = {
  save: string;
  reset: string;
  progressTitle: string;
  fieldsFilledText: string;
  fillRequiredFields: string;
  allFieldsFilled: string;
  creating: string;
  submit: string;
  of: string;
  [key: string]: unknown;
};

export type FormProgress = {
  closeError: string;
  [key: string]: unknown;
};

export type Select = {
  defaultPlaceholder: string;
  [key: string]: unknown;
};

export type SearchSelect = {
  defaultPlaceholder: string;
  searchPlaceholder: string;
  [key: string]: unknown;
};

export type TranslationType = {
  header: Header;
  card: Card;
  filters: Filters;
  products: Products;
  errors: Errors;
  auth: Auth;
  admin_home: AdminHome;
  sidebar: Sidebar;
  product_create: ProductCreate;
  admin_products_list: AdminProductsList;
  progress_indicator: ProgressIndicator;
  brand_create: BrandCreate;
  brand_form: BrandForm;
  product_detail: ProductDetail;
  product_card: ProductCard;
  category_modal: CategoryModal;
  image_slot: ImageSlot;
  action_bar: ActionBar;
  inline_action_bar: InlineActionBar;
  form_progress: FormProgress;
  select: Select;
  search_select: SearchSelect;
  [key: string]: unknown;
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

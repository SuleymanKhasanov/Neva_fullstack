export async function loadTranslations(locale: string) {
  const defaultTranslations = {
    header: {
      logo: 'Logo',
      search: 'Search',
      languageSwitcherLabel: 'Select language',
      contactUs: 'Contact Us',
    },
    card: {
      more_details: 'More details',
    },
    filters: {
      all: 'All',
      neva: 'NEVA',
      xSolution: 'X-SOLUTION',
      noBrands: 'No brands available',
    },
    products: {
      noMore: 'No more products',
      loading: 'Loading products...',
    },
    errors: {
      brands: 'Error loading brands',
      unknown: 'Unknown error occurred',
    },
    auth: {
      title: 'Admin Panel',
      subtitle: 'Login to access management',
      username: 'Username',
      password: 'Password',
      usernameRequired: 'Username is required',
      usernameMinLength: 'Username must be at least 3 characters',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      invalidCredentials: 'Invalid username or password',
      serverError: 'Server error. Please try again later',
      networkError: 'Connection error to server',
      unexpectedError: 'Unexpected error. Please try again later',
      usernamePlaceholder: 'Enter your username',
      passwordPlaceholder: 'Enter your password',
      loading: 'Loading...',
      dashboard: {
        title: 'Admin Panel',
        welcome: 'Welcome, {username}!',
        logout: 'Logout',
        users: 'Users',
        usersDescription: 'User management system',
        settings: 'Settings',
        settingsDescription: 'System configuration',
        reports: 'Reports',
        reportsDescription: 'View analytics and reports',
        statistics: 'Statistics',
        statisticsDescription: 'Charts and statistics will be displayed here',
        systemStatus: 'System is running',
      },
    },
    admin_home: {
      title: 'Dashboard',
      subtitle: 'Manage products, categories and system',
      stats: {
        products: {
          title: 'Products',
          description: 'Total number of products in catalog',
        },
        categories: {
          title: 'Categories',
          description: 'Number of main categories',
        },
        subcategories: {
          title: 'Subcategories',
          description: 'Number of subcategories in all sections',
        },
        brands: {
          title: 'Brands',
          description: 'Total number of brands in system',
        },
      },
      loading: 'Loading...',
      error: {
        title: 'Loading Error',
        description: 'Failed to load statistics',
        demo: 'Demo data shown',
      },
    },
    sidebar: {
      dashboard: 'Dashboard',
      productsCreate: 'Create Product',
      productsList: 'Products List',
      brandsCreate: 'Create Brand',
      closeMenu: 'Close menu',
      adminNavigation: 'Admin navigation',
      logoTitle: 'East Telecom',
      logoSubtitle: 'B2B Catalog Admin Panel',
      back: 'Back',
    },
    product_create: {
      title: 'Create Product',
      subtitle: 'Fill in all required fields to create a new product',
      sections: {
        basicInfo: {
          title: 'Basic Information',
          description:
            'Select section, category, subcategory, brand and enter product model name',
        },
        images: {
          title: 'Images',
          description: 'Upload product images and photos',
        },
        details: {
          title: 'Description and Specifications',
          description: 'Add detailed description and technical specifications',
        },
      },
      fields: {
        section: {
          label: 'Section *',
          placeholder: 'Select section',
          required: 'Please select section',
        },
        category: {
          label: 'Category *',
          placeholder: 'Select category',
          loading: 'Loading categories...',
          selectSectionFirst: 'Select section first',
          required: 'Please select category',
        },
        subcategory: {
          label: 'Subcategory',
          placeholder: 'Select subcategory',
          loading: 'Loading subcategories...',
          selectCategoryFirst: 'Select category first',
          notAvailable: 'Subcategories not available',
        },
        brand: {
          label: 'Brand',
          placeholder: 'Select brand',
          loading: 'Loading brands...',
          selectSubcategoryFirst: 'Select subcategory first',
          notAvailable: 'Brands not available',
        },
        productName: {
          label: 'Enter model name *',
          placeholder: 'Enter product name',
          required: 'Please enter product name',
        },
        productDescription: {
          label_ru: 'Product Description (Russian) *',
          label_en: 'Product Description (English) *',
          label_uz: 'Product Description (Uzbek) *',
          label_kr: 'Product Description (Korean) *',
          placeholder: 'Enter product description',
          specifications: {
            label: 'Technical Specifications',
            placeholder: 'Enter technical specifications',
          },
        },
      },
      sections_names: {
        neva: 'Neva',
        x_solution: 'X-Solution',
      },
      loading: {
        categories: 'categories',
        subcategories: 'subcategories',
        brands: 'brands',
      },
    },
    admin_products_list: {
      title: 'Products List',
      totalProducts: 'Total products',
      loadedProducts: 'products loaded',
      deleteModeActive: 'Delete Mode Active',
      loadMore: 'Load More',
      loading: 'Loading...',
      authCheck: 'Checking authorization...',
      confirmDelete: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?',
        cancel: 'Cancel',
        confirm: 'Delete',
      },
      productDeleted: 'Product successfully deleted',
      hint: {
        title: 'Delete Mode',
        description: 'Hold Shift and click on products to delete them',
      },
      modeInfo: 'Press Shift to activate delete mode',
    },
    progress_indicator: {
      title: 'Progress',
      completed: 'Completed',
      createProduct: 'Create Product',
      reset: 'Reset',
      resetMessage: 'Fields successfully reset!',
      successMessage: 'Product created successfully!',
    },
    brand_create: {
      title: 'Create Brand',
      subtitle: 'Create a new brand and link it to categories',
      authTokenNotFound: 'Authorization token not found',
      createError: 'Brand creation error',
      createSuccess: 'Brand created successfully!',
      formReset: 'Form reset',
      submitButton: 'Create Brand',
      resetButton: 'Reset',
      progressTitle: 'Form Completion',
      creating: 'Creating brand...',
    },
    brand_form: {
      basicInfo: 'Basic Information',
      description:
        'Select section, category and enter brand name. Subcategory is optional.',
      sectionLabel: 'Section *',
      selectSection: 'Select section',
      categoryLabel: 'Category *',
      loadingCategories: 'Loading categories...',
      selectCategory: 'Select category',
      selectSectionFirst: 'Select section first',
      subcategoryLabel: 'Subcategory (optional)',
      loadingSubcategories: 'Loading subcategories...',
      selectSubcategory: 'Select subcategory (optional)',
      selectCategoryFirst: 'Select category first',
      brandNameLabel: 'Brand Name *',
      enterBrandName: 'Enter brand name',
    },
    product_detail: {
      imageAlt: 'image',
      imageUnavailable: 'Image unavailable',
      specifications: 'Technical Specifications',
      noSpecifications:
        'Please contact our managers for product specifications',
      callToLearnMore: 'Call us to learn more',
    },
    product_card: {
      delete: 'Delete',
      noImage: 'No image available',
    },
    category_modal: {
      noCategories: 'No categories',
      back: 'Back',
      noBrands: 'No brands',
      title: 'Categories',
    },
    image_slot: {
      formatError: 'Only JPEG, PNG and WebP formats are supported',
      sizeError: 'Maximum file size is 10MB',
      imageLabel: 'Image',
      addImageLabel: 'Add image',
      setPrimary: 'Set as primary',
      setPrimaryImage: 'Set as primary image',
      deleteImage: 'Delete image',
      primary: 'Primary',
    },
    action_bar: {
      save: 'Save',
      reset: 'Reset',
      filled: 'filled',
      saving: 'Saving...',
      fillRequired: 'Fill all required fields to save',
    },
    inline_action_bar: {
      save: 'Save',
      reset: 'Reset',
      progressTitle: 'Completion Progress',
      of: 'of',
      fieldsFilledText: 'fields filled',
      fillRequiredFields: 'Fill all required fields to create product',
      allFieldsFilled: 'All fields filled! Ready to create product',
      creating: 'Creating...',
      submit: 'Submit',
    },
    form_progress: {
      closeError: 'Close error',
    },
    select: {
      defaultPlaceholder: 'Select option',
    },
    search_select: {
      defaultPlaceholder: 'Select...',
      searchPlaceholder: 'Search...',
    },
  };

  // Список всех файлов переводов
  const translationFiles = [
    'header',
    'card',
    'filters',
    'products',
    'errors',
    'auth',
    'admin_home',
    'sidebar',
    'product_create',
    'admin_products_list',
    'progress_indicator',
    'brand_create',
    'brand_form',
    'product_detail',
    'product_card',
    'category_modal',
    'image_slot',
    'action_bar',
    'inline_action_bar',
    'form_progress',
    'select',
    'search_select',
  ];

  try {
    // Загружаем все переводы параллельно
    const translationPromises = translationFiles.map(async (file) => {
      try {
        const module = await import(`@/shared/locales/${locale}/${file}.json`);
        return { [file]: module.default };
      } catch (error) {
        console.warn(
          `Failed to load translation file: ${file}.json for locale: ${locale}`,
          error
        );
        return { [file]: (defaultTranslations as any)[file] };
      }
    });

    const translationResults = await Promise.allSettled(translationPromises);

    // Объединяем результаты
    const translations = translationResults.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        return { ...acc, ...result.value };
      }
      return acc;
    }, {} as any);

    // Проверяем, что все переводы загружены, и используем дефолтные для отсутствующих
    const finalTranslations = { ...defaultTranslations };
    translationFiles.forEach((file) => {
      if (translations[file]) {
        finalTranslations[file] = translations[file];
      }
    });

    return finalTranslations;
  } catch (error) {
    console.error(
      `Unexpected error in loadTranslations for locale "${locale}":`,
      error
    );
    return defaultTranslations;
  }
}

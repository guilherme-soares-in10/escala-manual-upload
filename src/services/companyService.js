import { post, get, put, del } from '@aws-amplify/api';

export const getCompanies = async () => {
  try {
    console.log('Calling getCompanies API...');
    const response = await get({
      apiName: 'iknowuploadapi',
      path: '/companies'
    });
    console.log('getCompanies API response:', JSON.stringify(response, null, 2));
    
    // Handle the response format
    if (response?.response) {
      // If response is a Promise, wait for it
      if (response.response instanceof Promise) {
        const resolvedResponse = await response.response;
        console.log('Resolved response:', JSON.stringify(resolvedResponse, null, 2));
        return resolvedResponse;
      }
      return response.response;
    }
    
    // Handle other formats
    if (Array.isArray(response)) {
      return response;
    } else if (response?.items) {
      return response.items;
    } else if (response?.companies) {
      return response.companies;
    } else if (response?.data) {
      return response.data;
    } else {
      console.log('Unexpected response format:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
};

export const getCompany = async (companyId) => {
  try {
    console.log('Calling getCompany API for:', companyId);
    const response = await get({
      apiName: 'iknowuploadapi',
      path: `/companies/${companyId}`
    });
    console.log('getCompany API response:', response);
    return response[0]; // API returns an array, we want the first item
  } catch (error) {
    console.error('Error fetching company:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    console.log('Calling createCompany API with:', companyData);
    const response = await post({
      apiName: 'iknowuploadapi',
      path: '/companies',
      options: {
        body: companyData
      }
    });
    console.log('createCompany API response:', response);
    return response;
  } catch (error) {
    console.error('Error creating company:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
};

export const updateCompany = async (companyData) => {
  try {
    console.log('Calling updateCompany API with:', companyData);
    const response = await put({
      apiName: 'iknowuploadapi',
      path: '/companies',
      options: {
        body: companyData
      }
    });
    console.log('updateCompany API response:', response);
    return response;
  } catch (error) {
    console.error('Error updating company:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    console.log('Calling deleteCompany API for:', companyId);
    const response = await del({
      apiName: 'iknowuploadapi',
      path: `/companies/object/${companyId}`
    });
    console.log('deleteCompany API response:', response);
    return response;
  } catch (error) {
    console.error('Error deleting company:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
}; 
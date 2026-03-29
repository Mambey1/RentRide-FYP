import React, { useState } from 'react';

const IdentityVerification = () => {
  const [licenseFile, setLicenseFile] = useState(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicensePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLicense = () => {
    setLicenseFile(null);
    setLicensePreview(null);
  };

  const removePassport = () => {
    setPassportPhotoFile(null);
    setPassportPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Submitted files:', { licenseFile, passportPhotoFile });
    }, 1500);
  };

  const handleReset = () => {
    setLicenseFile(null);
    setPassportPhotoFile(null);
    setLicensePreview(null);
    setPassportPreview(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Verify Your Identity</h1>
          <p className="text-blue-100 mt-2">
            Please provide the following documents to complete your verification.
          </p>
        </div>
        
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Submitted!</h2>
              <p className="text-gray-600 mb-8">Your documents have been received and are being reviewed. We'll notify you once verification is complete.</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
              >
                Submit Another Verification
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Please submit the following documents</h2>
                
                <div className="space-y-8">
                  {/* License Upload Section */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 transition duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Upload License Photo</h3>
                      {licenseFile && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Uploaded
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-5">
                      Please upload a clear photo of your driver's license.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        {licensePreview ? (
                          <div className="relative">
                            <img 
                              src={licensePreview} 
                              alt="License preview" 
                              className="w-full h-48 object-contain border border-gray-200 rounded-lg"
                            />
                            <button
                              onClick={removeLicense}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition duration-200">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-gray-700 font-medium mb-2">Upload Driver's License</p>
                              <p className="text-gray-500 text-sm mb-4">JPG, PNG or PDF. Max 5MB.</p>
                              <label htmlFor="license-upload" className="cursor-pointer">
                                <div className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Choose File
                                </div>
                                <input
                                  id="license-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/*,.pdf"
                                  onChange={handleLicenseUpload}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Tips for a clear license photo:
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Ensure all four corners are visible</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Make sure the text is readable</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Photo should be well-lit without glare</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Avoid shadows on the license</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passport Photo Upload Section */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 transition duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Upload Passport-size Photo</h3>
                      {passportPhotoFile && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Uploaded
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-5">
                      Please upload a recent passport-size photo of yourself.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        {passportPreview ? (
                          <div className="relative">
                            <img 
                              src={passportPreview} 
                              alt="Passport photo preview" 
                              className="w-full h-48 object-cover border border-gray-200 rounded-lg"
                            />
                            <button
                              onClick={removePassport}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition duration-200">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <p className="text-gray-700 font-medium mb-2">Upload Passport Photo</p>
                              <p className="text-gray-500 text-sm mb-4">JPG or PNG. Max 5MB.</p>
                              <label htmlFor="passport-upload" className="cursor-pointer">
                                <div className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Choose File
                                </div>
                                <input
                                  id="passport-upload"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handlePassportUpload}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Passport photo requirements:
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Photo must be recent (within last 6 months)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Plain white or light-colored background</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Face should be clearly visible</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>No hats or sunglasses (except for religious purposes)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-green-800">Your documents are safely encrypted</h4>
                  <p className="text-green-700 text-sm mt-1">
                    All uploaded documents are protected with bank-level encryption and will only be used for identity verification purposes.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!licenseFile || !passportPhotoFile || isSubmitting}
                  className={`px-8 py-3 font-medium rounded-lg transition duration-200 flex items-center ${
                    licenseFile && passportPhotoFile && !isSubmitting
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Confirm & Submit Verification
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-200">
          <p>This verification process is compliant with KYC (Know Your Customer) regulations.</p>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
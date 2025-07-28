if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/DHIRAJ/.gradle/caches/8.13/transforms/c6ccce07040b757d8fd6ccad589c2b1a/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/DHIRAJ/.gradle/caches/8.13/transforms/c6ccce07040b757d8fd6ccad589c2b1a/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()


# React - Native _ Project - Markus Sarsanto

UI Library: Bootstrap

Struktur Folder:

- client-mobile
- server 
  - orchestrator (port: 4000)
  - orchestrator-express (port: 4000)
  - services
    - users - mongodb (port: 4001)
    - app - postgres (port: 4002)

## Step - 1 

Target:

- Memahami `react-native` dan `expo`
- Install `expo-cli` & `expo init` & setup project mobile
- Mencoba component Text, View, Image, StyleSheet, Button, ScrollView, FlatList
- Mencoba useState, useEffect dalam react-native
- Hit API server yang sudah dibuat untuk mendapatkan data
- Mengetahui bahwa redux & redux-thunk bisa diimplementasi di react-native
- Memahami `react-native-navigation`
- Memahami Stack Navigation & Tab Navigation
- Membuat min 2 Screen (Home, Detail)

## Step - 2

Target:

- Memahami React Native Gesture Handler
- Memahami NoSQL: Mongodb
- Membuat service users dengan Mongodb (Kerjakan di `server/services/users`)
- Membuat action pada users: Read, Create & Delete (Update optional)


## Step - 3 

Target:

- Membuat Server Baru, Microservices
- Memisahkan service user dan app
- Membuat Orchestrator-express yang bisa komunikasi ke service user dan app
- Memahami cache dalam database
- Install dataabase Redis dan menggunakan ioRedis sebagai cache
- Menjaga relasi User dengan product pada microservice


## Step - 4

Target:

- Memahami GraphQL dan tahu perbedaan dengan RESTful API
- Membuat Orchestrator dengan menggunakan GraphQL
- Memahami Typedefs, Resolvers
- Mampu membuat Query dan Mutation
- Menggunakan redis pada graphql untuk kebutuhan cache server
- Memahami Apollo-Client & Implementasi pada mobile apps
- Memahami cache pada Apollo-Client

## W3D1

Target:

- Memahami Docker
- Implementasi Docker pada aplikasi server


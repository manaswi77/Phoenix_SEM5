import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/desa0upux/image/upload/v1728887381/c78iqsq4379nkcaljfxl.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Mary Jane Watson</Text>
          <Text style={styles.role}>Student</Text>
        </View>
        <Feather name="more-vertical" size={24} color="black" style={styles.moreIcon} />
      </View>
      <Text style={styles.content}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </Text>
      <Image
        source={{ uri: 'https://res.cloudinary.com/desa0upux/image/upload/v1728887310/o3emeo0dmz9nxgtcejqe.png' }}
        style={styles.postImage}
      />
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Feather name="thumbs-up" size={20} color="black" />
          <Text style={styles.footerText}>100k</Text>
        </View>
        <View style={styles.footerItem}>
          <Feather name="message-square" size={20} color="black" />
          <Text style={styles.footerText}>100k</Text>
        </View>
        <View style={styles.footerItem}>
          <Feather name="share-2" size={20} color="black" />
        </View>
        <View style={styles.footerItem}>
          <Feather name="bookmark" size={20} color="black" />
        </View>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0eff4',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  moreIcon: {
    marginLeft: 'auto',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 4,
    fontSize: 14,
  },
})
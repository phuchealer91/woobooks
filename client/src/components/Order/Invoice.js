import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'
import logo from '../../assets/images/logo.png'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
function Invoice({ userOrders: order }) {
  function removeAccents(str) {
    return str
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  }
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: 'column',
    },
    logo: {
      width: 74,
      height: 66,
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    reportTitle: {
      color: '#61dafb',
      letterSpacing: 4,
      fontSize: 25,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    invoiceNoContainer: {
      flexDirection: 'row',
      marginTop: 36,
      justifyContent: 'flex-end',
    },
    invoiceDateContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    invoiceDate: {
      fontSize: 12,
      fontStyle: 'bold',
    },
    label: {
      width: 60,
    },
    headerContainer: {
      marginTop: 36,
    },
    billTo: {
      marginTop: 20,
      paddingBottom: 3,
      fontFamily: 'Helvetica-Oblique',
    },
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 24,
      borderWidth: 1,
      '#ccc': '#bff0fd',
    },
    container: {
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      backgroundColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      textAlign: 'center',
      fontStyle: 'bold',
      flexGrow: 1,
    },

    qty: {
      width: '10%',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
      textAlign: 'right',
      paddingRight: 8,
    },
    rate: {
      width: '15%',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
      textAlign: 'right',
      paddingRight: 8,
    },
    amount: {
      width: '15%',
      textAlign: 'right',
      paddingRight: 8,
    },
    row: {
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      fontStyle: 'bold',
      color: '#333',
    },
    description: {
      width: '60%',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
    },
    qty: {
      width: '10%',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
    },
    rate: {
      width: '15%',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
    },
    amount: {
      width: '15%',
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    reportTitle: {
      fontSize: 12,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  })
  return (
    <Document>
      <Page style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Workbook</Text>
        </View>

        <>
          <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>
              {new Date().toLocaleString()}
            </Text>
          </View>
          <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text>{new Date().toLocaleString()}</Text>
          </View>
        </>

        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Bill To:</Text>
          <Text>Name: {removeAccents(order.deliveryAddress?.name)}</Text>
          <Text>
            Address: {removeAccents(order.deliveryAddress?.mainAddress)},{' '}
            {removeAccents(order.deliveryAddress?.fullAddress)}
          </Text>
          <Text>Phone: {order.deliveryAddress?.phone}</Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.description}>Name</Text>
            <Text style={styles.qty}>Count</Text>
            <Text style={styles.rate}>NXB</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>
          <>
            {order &&
              order?.products.map((item) => {
                return (
                  <View style={styles.row}>
                    <Text style={styles.description}>
                      {removeAccents(item.product?.title)}
                    </Text>
                    <Text style={styles.qty}>{item?.count}</Text>
                    <Text style={styles.rate}>
                      {removeAccents(item.product?.publisher)}
                    </Text>
                    <Text style={styles.amount}>
                      {item.product.sale > 0
                        ? formatPriceSale(
                            item.product.price * item.count,
                            item.product.sale
                          )
                        : formatPrice(item.product.price * item.count)}
                      đ
                    </Text>
                  </View>
                )
              })}
          </>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Order info:</Text>

          <Text>
            Date:{' '}
            {new Date(order.paymentIntent?.created * 1000).toLocaleString()}
          </Text>
          <Text>
            Order Id: {'         '}
            {order.paymentIntent?.id}
          </Text>
          <Text>
            Order Status: {'  '}
            {removeAccents(order.orderStatus)}
          </Text>
          <Text>
            Total Paid: {'       '}
            {formatPrice(order.paymentIntent?.amount)}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Thank you for your business</Text>
        </View>
      </Page>
    </Document>
  )
}

Invoice.propTypes = {}
export default Invoice

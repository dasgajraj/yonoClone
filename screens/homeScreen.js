import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, Alert } from "react-native"
import Header from "../components/Header"
const { width } = Dimensions.get("window")

const HomeScreen = () => {
  const [user, setUser] = useState({ name: "John Doe", accountNumber: "1234567890" })
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [transactions,setTransactions] = useState([]);

    // Fetch transactions from API
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://686cc7b514219674dcc916e6.mockapi.io/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchTransactions();
    }, []);
  
    // Calculate balance from transactions
    const calculateBalance = () => {
      if (!transactions || transactions.length === 0) {
        return 0;
      }
      return transactions.reduce((total, transaction) => {
        const amount = transaction.transaction ;
        if (transaction.mode === 'deposit') {
          return total + amount;
        } else return total+0;
      }, 0);
    };
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };
  

  const serviceItems = [
    { id: 1, title: "Account\nSummary", icon: "📊", color: "#E8F4FD" },
    { id: 2, title: "Fund\nTransfer", icon: "💸", color: "#FFF2E8" },
    { id: 3, title: "Mobile\nRecharge", icon: "📱", color: "#E8F8F5" },
    { id: 4, title: "Bill &\nRecharge", icon: "💡", color: "#FDF2F8" },
    { id: 5, title: "Investments", icon: "📈", color: "#F0F9FF" },
    { id: 6, title: "Insurance", icon: "🛡️", color: "#F7FEE7" },
    { id: 7, title: "Loans", icon: "🏠", color: "#FEF7FF" },
    { id: 8, title: "Cards", icon: "💳", color: "#FFFBEB" },
    { id: 9, title: "Offers", icon: "🎁", color: "#F0FDF4" },
  ]

  const handleServicePress = (service) => {
    Alert.alert("Service Selected", `You selected ${service.title.replace("\n", " ")}`)
  }


  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>SBI YONO</Text>
          <Text style={styles.loginSubtitle}>Digital Banking</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Header />

        {/* Personalized User Info Card */}
        <View style={styles.userInfoCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.userInfoDetails}>
            <Text style={styles.userName}>Hi, {user.name}</Text>
            <Text style={styles.userEmail}>{user.email || 'demo@user.com'}</Text>
            <Text style={styles.userMobile}>📱 {user.mobile || '123456789'}</Text>
            <Text style={styles.userAccount}>A/c: {user.accountNumber}</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Available Balance</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Text style={styles.eyeIcon}>{showBalance ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {loading ? 'Loading...' : (showBalance ? formatCurrency(calculateBalance()) : '•••••••')}
          </Text>
          <Text style={styles.accountNumber}>A/c: ****{user.accountNumber.slice(-4)}</Text>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            {serviceItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.serviceItem, { backgroundColor: item.color }]}
                onPress={() => handleServicePress(item)}
              >
                <Text style={styles.serviceIcon}>{item.icon}</Text>
                <Text style={styles.serviceTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoContainer}>
          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Special Offers</Text>
              <Text style={styles.promoSubtitle}>Exclusive deals for YONO users</Text>
            </View>
            <View style={styles.promoImage}>
              <Text style={styles.promoIcon}>🎯</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>🔄</Text>
              <Text style={styles.quickActionText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>📱</Text>
              <Text style={styles.quickActionText}>Recharge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>💡</Text>
              <Text style={styles.quickActionText}>Pay Bills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Statement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Header Styles
  header: {
    backgroundColor: "#6B46C1",
    paddingTop: StatusBar.currentHeight || 0,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: "#FFFFFF",
    marginVertical: 2,
  },
  yonoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4,
  },
  headerIconText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  headerBottom: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  lastLoginText: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 2,
  },

  // Content Styles
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // User Info Card Styles
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B46C1',
  },
  userInfoDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  userMobile: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  userAccount: {
    fontSize: 13,
    color: '#6B7280',
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  eyeIcon: {
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  // Services Styles
  servicesContainer: {
    marginTop: 24,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    width: (width - 48) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
    lineHeight: 16,
  },

  // Promo Banner Styles
  promoContainer: {
    marginTop: 24,
  },
  promoBanner: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: "#A16207",
  },
  promoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FCD34D",
    alignItems: "center",
    justifyContent: "center",
  },
  promoIcon: {
    fontSize: 24,
  },

  // Quick Actions Styles
  quickActionsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAction: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: (width - 64) / 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },

  // Login Styles
  loginContainer: {
    flex: 1,
    backgroundColor: "#6B46C1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loginCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B46C1",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#6B46C1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
})

export default HomeScreen

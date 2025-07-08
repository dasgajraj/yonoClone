import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

const LockScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer?.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mpin, setMpin] = useState('');
  const [loginMode, setLoginMode] = useState('username'); // 'username' or 'mpin'
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

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

  const handleLogin = () => {
    if (loginMode === 'username') {
      if (username === user?.username && password === user?.password) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('home');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } else {
      if (mpin === user?.mpin) {
        Alert.alert('Success', 'MPIN login successful!');
        navigation.navigate('home');
      } else {
        Alert.alert('Error', 'Invalid MPIN');
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleBalanceView = () => {
    setShowBalance(!showBalance);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E91E63" hidden={false} />

      {/* Header with Location */}
      <Header />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.content}>
              <LinearGradient
                colors={['#E91E63', '#AD1457']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                {/* Login Section */}
                <View style={styles.loginSection}>
                  <View style={styles.loginCard}>
                    <View style={styles.loginHeader}>
                      <Text style={styles.loginIcon}>↩</Text>
                      <Text style={styles.loginText}>LOGIN</Text>
                    </View>

                    {/* Login Mode Toggle */}
                    <View style={styles.toggleContainer}>
                      <TouchableOpacity
                        style={[
                          styles.toggleButton,
                          loginMode === 'username' && styles.toggleButtonActive
                        ]}
                        onPress={() => setLoginMode('username')}
                      >
                        <View style={styles.toggleButtonInner}>
                          <View style={[
                            styles.toggleIcon,
                            loginMode === 'username' && styles.toggleIconActive
                          ]}>
                            <Text style={styles.toggleIconText}>👤</Text>
                          </View>
                          <Text style={[
                            styles.toggleText,
                            loginMode === 'username' && styles.toggleTextActive
                          ]}>
                            USERNAME
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.toggleButton,
                          loginMode === 'mpin' && styles.toggleButtonActive
                        ]}
                        onPress={() => setLoginMode('mpin')}
                      >
                        <View style={styles.toggleButtonInner}>
                          <View style={[
                            styles.toggleIcon,
                            loginMode === 'mpin' && styles.toggleIconActive
                          ]}>
                            <Text style={styles.toggleIconText}>🔢</Text>
                          </View>
                          <Text style={[
                            styles.toggleText,
                            loginMode === 'mpin' && styles.toggleTextActive
                          ]}>
                            MPIN
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Login Form */}
                    {loginMode === 'username' ? (
                      <View style={styles.inputSection}>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Username</Text>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Enter your username"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </View>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Password</Text>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </View>
                        <TouchableOpacity style={styles.forgotPasswordButton}>
                          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.inputSection}>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>MPIN</Text>
                          <TextInput
                            style={[styles.textInput, styles.mpinInput]}
                            placeholder="Enter 4-digit MPIN"
                            placeholderTextColor="#999"
                            value={mpin}
                            onChangeText={setMpin}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry={true}
                          />
                        </View>
                        <TouchableOpacity style={styles.forgotPasswordButton}>
                          <Text style={styles.forgotPasswordText}>Forgot MPIN?</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                      <LinearGradient
                        colors={['#E91E63', '#AD1457']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButtonGradient}
                      >
                        <Text style={styles.loginButtonText}>Login</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>

              {/* Balance Section */}
              <View style={styles.balanceSection}>
                <View style={styles.balanceCard}>
                  <TouchableOpacity style={styles.closeButton} onPress={toggleBalanceView}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.balanceHeader} onPress={toggleBalanceView}>
                    <Text style={styles.balanceIcon}>👁</Text>
                    <Text style={styles.balanceTitle}>VIEW BALANCE</Text>
                  </TouchableOpacity>

                  {showBalance && (
                    <View style={styles.balanceContent}>
                      <Text style={styles.balanceAmount}>
                        {loading ? 'Loading...' : formatCurrency(calculateBalance())}
                      </Text>
                      <View style={styles.divider} />
                      <Text style={styles.accountNumber}>A/c No XXXXXXXXX1234</Text>

                      <TouchableOpacity style={styles.transactionsButton}>
                        <Text style={styles.transactionsText}>View Transactions</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              {/* Quick Pay Section */}
              <View style={styles.quickPaySection}>
                <View style={styles.quickPayCard}>
                  <Text style={styles.quickPayTitle}>Quick Pay</Text>
                  <View style={styles.quickPayGrid}>
                    <TouchableOpacity style={styles.quickPayItem}>
                      <Text style={styles.quickPayIcon}>⚡</Text>
                      <Text style={styles.quickPayText}>Scan & Pay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickPayItem}>
                      <Text style={styles.quickPayIcon}>👤</Text>
                      <Text style={styles.quickPayText}>Pay to Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickPayItem}>
                      <Text style={styles.quickPayIcon}>🏦</Text>
                      <Text style={styles.quickPayText}>Pay to Bank A/C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickPayItem}>
                      <Text style={styles.quickPayIcon}>📄</Text>
                      <Text style={styles.quickPayText}>Bill Pay</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.qrButton}>
                    <Text style={styles.qrButtonText}>Receive Money via QR</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSection}>
                <View style={styles.bottomGrid}>
                  <TouchableOpacity style={styles.bottomItem}>
                    <Text style={styles.bottomIcon}>💰</Text>
                    <Text style={styles.bottomText}>YONO Cash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomItem}>
                    <Text style={styles.bottomIcon}>💳</Text>
                    <Text style={styles.bottomText}>Loans</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomItem}>
                    <Text style={styles.bottomIcon}>📈</Text>
                    <Text style={styles.bottomText}>Investments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomItem}>
                    <Text style={styles.bottomIcon}>⭐</Text>
                    <Text style={styles.bottomText}>Best Offers</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
  },
  gradient: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginSection: {
    paddingHorizontal: 20,
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginIcon: {
    fontSize: 20,
    marginRight: 15,
    color: '#666',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggleContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  toggleButton: {
    height: 50,
    width: '48%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  toggleButtonActive: {
    backgroundColor: '#FFF0F3',
    borderColor: '#E91E63',
  },
  toggleButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleIcon: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toggleIconActive: {
    backgroundColor: '#E91E63',
  },
  toggleIconText: {
    fontSize: 10,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    flex: 1,
    flexWrap: 'wrap',
  },
  toggleTextActive: {
    color: '#E91E63',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  mpinInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 14,
    color: '#666',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#E91E63',
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  balanceContent: {
    marginTop: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E91E63',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
  },
  accountNumber: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  transactionsButton: {
    alignItems: 'center',
  },
  transactionsText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '500',
  },
  quickPaySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickPayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickPayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickPayGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  quickPayItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 10,
  },
  quickPayIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#E91E63',
  },
  quickPayText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  qrButton: {
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  qrButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  bottomItem: {
    alignItems: 'center',
    width: '22%',
    paddingVertical: 15,
  },
  bottomIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#E91E63',
  },
  bottomText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  banner: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LockScreen;
import PendingPaymentInstructionInput from './PendingPaymentInstructionInput';
import TransactionPaymentDetails from './TransactionPaymentDetails';

export default interface Transaction {
  amount: number;
  buyer_pending_payment_instructions: PendingPaymentInstructionInput[];
  buyer_pending_payment_notice: string;
  created_at: string;
  gateway: string;
  gateway_display_name: string;
  id: number;
  kind: 'authorization';
  capture;
  sale;
  void;
  refund;
  name: string;
  payment_details: TransactionPaymentDetails;
  receipt: string;
  show_buyer_pending_payment_instructions?: boolean;
  status: 'sucess';
  pending;
  failure;
  error;
  status_label: string;
}

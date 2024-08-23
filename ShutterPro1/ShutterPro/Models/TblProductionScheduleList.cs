using System;
using System.Collections.Generic;

namespace ShutterPro.Models;

public partial class TblProductionScheduleList
{
    public int Id { get; set; }

    public int? CustomeriD { get; set; }

    public int? JobNumber { get; set; }

    public DateTime? EnteredDatetime { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? OrderReference { get; set; }

    public string? CustomerName { get; set; }

    public string? State { get; set; }

    public int? OrderStatus { get; set; }

    public int? InvoiceMonth { get; set; }

    public int? InvoiceWeek { get; set; }

    public double? TotalSqm { get; set; }

    public int? TotalPanels { get; set; }

    public int? PanelsLess700 { get; set; }

    public int? PanelsMore700 { get; set; }

    public int? QtyHinges { get; set; }

    public int? QtySliding { get; set; }

    public int? QtyBifold { get; set; }

    public int? QtyFixed { get; set; }

    public int? QtyZframe { get; set; }

    public int? QtyLframe { get; set; }

    public int? OffWhite { get; set; }

    public int? BrightWhite { get; set; }

    public string? Graremakes { get; set; }

    public string? UpdatesText { get; set; }

    public string? Bomcosted { get; set; }

    public string? ShutterPro { get; set; }

    public string? ShippingDetails { get; set; }

    public string? PlannedShippingDate { get; set; }

    public DateTime? ActualShippingDate { get; set; }

    public decimal? CostPrice { get; set; }

    public decimal? CostPriceGst { get; set; }

    public int? PriorityLevel { get; set; }

    public int? OrderTypeId { get; set; }

    public string? ShutterProNumber { get; set; }

    public DateTime? ScheduledDate { get; set; }

    public int? RemakeReasonId { get; set; }

    public int? RemakeLiablePartyId { get; set; }

    public string? RemakeIssueDescription { get; set; }

    public string? OriginalOrderNumber { get; set; }

    public DateTime? InvoicedDate { get; set; }

    public DateTime? EnteredShutterProDate { get; set; }

    public DateTime? CollectedFactoryDate { get; set; }

    public DateTime? ExpectedShippingDate { get; set; }

    public int? OnHold { get; set; }

    public DateTime? ReceivedDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public decimal? FreightAmount { get; set; }

    public decimal? FreightAmountGst { get; set; }

    public int? ProductTypeId { get; set; }

    public string? OzrollContractNo { get; set; }

    public int? Deleted { get; set; }

    public int? DeliveryAddressId { get; set; }

    public int? CreditOverrideUserId { get; set; }

    public DateTime? CreditOverrideDateTime { get; set; }

    public int? OutstandingItemsConfirmId { get; set; }

    public DateTime? OutstandingItemsConfirmDateTime { get; set; }

    public DateTime? PickingDate { get; set; }

    public DateTime? PromisedDate { get; set; }

    public decimal? RetailDiscount { get; set; }

    public decimal? SalePrice { get; set; }

    public decimal? SalePriceGst { get; set; }

    public int? SalePriceIsValid { get; set; }

    public int? AddressZoneId { get; set; }

    public DateTime? QuoteExpiryDateTime { get; set; }

    public string SybizJobCode { get; set; } = null!;

    public string SybizSalesInvoiceNumber { get; set; } = null!;

    public int CreditCheckOverride { get; set; }

    public DateTime? ManufacturingDate { get; set; }

    public string? CollectedBy { get; set; }

    public int? CheckMyOrder { get; set; }

    public int? ConfirmMyOrder { get; set; }

    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }

    public int? GraNumber { get; set; }

    public int? OrderSource { get; set; }
}

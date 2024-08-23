using System;
using System.Collections.Generic;

namespace ShutterPro.Models;

public partial class TblPlantationJobDetail
{
    public int PsdetailId { get; set; }

    public int? PlantationScheduleListId { get; set; }

    public int? ShutterId { get; set; }

    public int? Quantity { get; set; }

    public int? InstallationAreaId { get; set; }

    public string? InstallationArea { get; set; }

    public int? RoomLocationId { get; set; }

    public string? RoomLocation { get; set; }

    public string? RoomLocationOther { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public int? MountConfigId { get; set; }

    public string? MountConfig { get; set; }

    public int? MountStyleId { get; set; }

    public string? MountStyle { get; set; }

    public int? PanelQtyId { get; set; }

    public string? PanelQty { get; set; }

    public int? BladeSizeId { get; set; }

    public string? BladeSize { get; set; }

    public int? ColourId { get; set; }

    public string? Colour { get; set; }

    public int? MidRailHeight { get; set; }

    public int? LayoutId { get; set; }

    public string? Layout { get; set; }

    public string? LayoutOther { get; set; }

    public int? MountMethodId { get; set; }

    public string? MountMethod { get; set; }

    public int? HingeColourId { get; set; }

    public string? HingeColour { get; set; }

    public int? FrameTypeId { get; set; }

    public string? FrameType { get; set; }

    public int? SidesId { get; set; }

    public string? Sides { get; set; }

    public int? SlidingGuideId { get; set; }

    public string? SlidingGuide { get; set; }

    public int? SlidingOpenCloseId { get; set; }

    public string? SlidingOpenClose { get; set; }

    public int? TpostQtyId { get; set; }

    public string? TpostQty { get; set; }

    public int? TpostQtyLocationId { get; set; }

    public string? TpostQtyLocation { get; set; }

    public int? SplitBladeId { get; set; }

    public string? SplitBlade { get; set; }

    public int? SplitBladeHeight { get; set; }

    public int? LightBlockId { get; set; }

    public int? AngleBayId { get; set; }

    public string? AngleBay { get; set; }

    public string? ToCenterTpos1 { get; set; }

    public string? ToCenterTpos2 { get; set; }

    public string? ToCenterTpos3 { get; set; }

    public string? ToCenterTpos4 { get; set; }

    public string? ToCenterTpos5 { get; set; }

    public string? ToCenterTpos6 { get; set; }

    public string? ToCenterTpos7 { get; set; }

    public string? ToCenterTpos8 { get; set; }

    public string? SpecialRequirements { get; set; }

    public decimal? CostPrice { get; set; }

    public decimal? CostPriceGst { get; set; }

    public decimal? ExtrasPrice { get; set; }

    public decimal? ExtrasPriceGst { get; set; }

    public decimal? SalePrice { get; set; }

    public decimal? SalePriceGst { get; set; }

    public bool Deleted { get; set; }

    public int? Sideboards { get; set; }

    public int? BayPost { get; set; }

    public int? CornerPost { get; set; }

    public int? RemakeTypeId { get; set; }

    public int PelmetDepth { get; set; }

    public int PlantationPriceId { get; set; }

    public int BuildOut { get; set; }

    public int ConjoinedPanels { get; set; }

    public int PelmetTypeId { get; set; }

    public int SillCutZframeId { get; set; }

    public int MidRailHeight2 { get; set; }

    public int BayCornerId { get; set; }

    public int HorizontalTpostHeight { get; set; }

    public int? ControlTypeId { get; set; }
}

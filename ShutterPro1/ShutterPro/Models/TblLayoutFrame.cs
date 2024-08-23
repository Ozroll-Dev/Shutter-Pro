using System;
using System.Collections.Generic;

namespace ShutterPro.Models;

public partial class TblLayoutFrame
{
    public int PsdetailId { get; set; }
    public int? PlantationScheduleListId { get; set; }
    public int? PanelDesignId { get; set; }
    public int? ShutterId { get; set; }
    public int? Quantity { get; set; }
    public int? InstallationAreaId { get; set; }
    public string? InstallationArea { get; set; }
    public int? RoomLocationId { get; set; }
    public string? RoomLocation { get; set; }
    public string? RoomLocationOther { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
     public bool Dr { get; set; }
    public int UpperGap { get; set; }
    public int LowerGap { get; set; }
    public int? Slab { get; set; }
    public int? UpperSlab { get; set; }
    public int? LowerSlab { get; set; }
    public int? PanelQtyId { get; set; }
    public string? PanelQty { get; set; }
    public int? MidRailHeight { get; set; }
    public int? FrameTypeId { get; set; }
    public string? FrameType { get; set; }
    public int? BladeSizeId { get; set; }
    public string? BladeSize { get; set; }
    public int? TpostQtyId { get; set; }
    public string? TpostQty { get; set; }
    public int? TpostQtyLocationId { get; set; }
    public string? TpostQtyLocation { get; set; }
    public string? ToCenterTpos1 { get; set; }
    public string? ToCenterTpos2 { get; set; }
    public string? ToCenterTpos3 { get; set; }
    public string? ToCenterTpos4 { get; set; }
    public string? ToCenterTpos5 { get; set; }
    public string? ToCenterTpos6 { get; set; }
    public string? ToCenterTpos7 { get; set; }
    public string? ToCenterTpos8 { get; set; }
}

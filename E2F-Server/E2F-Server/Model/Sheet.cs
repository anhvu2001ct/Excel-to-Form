﻿namespace E2F_Server.Model
{
    public class Sheet
    {
        public int Index { get; set; }
        public string Name { get; set; } = null!;
        public SheetCord Cord { get; set; } = new();
        public List<SheetColumn> Columns { get; set; } = new();
    }
}

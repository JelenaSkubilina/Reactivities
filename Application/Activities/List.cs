using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext context;
            private readonly ILogger<List> logger;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context,
                ILogger<List> logger, 
                IMapper mapper,
                IUserAccessor userAccessor)
            {
                this.logger = logger;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await context.Activities
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new {currentUsername = userAccessor.GetUsername()})
                    .ToListAsync();

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
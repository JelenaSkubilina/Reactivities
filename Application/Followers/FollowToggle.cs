using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
         public class Command: IRequest<Result<Unit>>
         {
             public string TargetUsername {get;set;}
         }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext dataContext;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                this.dataContext = dataContext;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await dataContext.Users.FirstOrDefaultAsync(x => 
                    x.UserName == userAccessor.GetUsername());

                var targer = await dataContext.Users.FirstOrDefaultAsync(x => 
                    x.UserName == request.TargetUsername);

                if(targer == null) return null;

                var following = await dataContext.UserFollowings.FindAsync(observer.Id, targer.Id);

                if (following == null) 
                {
                    following = new Domain.UserFollowing
                    {
                        Observer = observer,
                        Target = targer
                    };

                    dataContext.UserFollowings.Add(following);
                }
                else
                {
                    dataContext.UserFollowings.Remove(following);
                }
                
                var success = await dataContext.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update following");
            }
        }
    }
}